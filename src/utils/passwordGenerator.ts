import * as Crypto from 'expo-crypto'

export type GeneratorOptions = {
  length: number
  lower: boolean
  upper: boolean
  number: boolean
  symbol: boolean
  ambiguous?: boolean
}

const AMBIGUOUS = 'lI1O0'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBER = '0123456789'
const SYMBOL = '!@#$%&^*?'

function removeAmbiguous(chars: string): string {
  return chars
    .split('')
    .filter((char) => !AMBIGUOUS.includes(char))
    .join('')
}

function buildEnabledPools(opts: GeneratorOptions): string[] {
  const pools: string[] = []

  if (opts.lower) pools.push(LOWER)
  if (opts.upper) pools.push(UPPER)
  if (opts.number) pools.push(NUMBER)
  if (opts.symbol) pools.push(SYMBOL)

  if (opts.ambiguous) {
    return pools.map(removeAmbiguous).filter((pool) => pool.length > 0)
  }

  return pools
}

export function calculatePoolSize(opts: GeneratorOptions): number {
  return buildEnabledPools(opts).join('').length
}

async function drawUnbiasedInt(maxExclusive: number): Promise<number> {
  const unbiasedLimit = Math.floor(256 / maxExclusive) * maxExclusive

  while (true) {
    const bytes: Uint8Array = await Crypto.getRandomBytesAsync(1)
    const byte = bytes[0]
    if (byte < unbiasedLimit) {
      return byte % maxExclusive
    }
  }
}

async function shuffleChars(chars: string[]): Promise<void> {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = await drawUnbiasedInt(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
}

async function generateUniformIndicesBatch(
  poolSize: number,
  passwordSize: number
): Promise<number[]> {
  const indices: number[] = []
  const unbiasedLimit = Math.floor(256 / poolSize) * poolSize
  const pickBatchSize = (remaining: number) => Math.max(64, remaining * 2)

  while (indices.length < passwordSize) {
    const remaining = passwordSize - indices.length
    const batchSize = pickBatchSize(remaining)
    const bytes: Uint8Array = await Crypto.getRandomBytesAsync(batchSize)

    for (let i = 0; i < bytes.length && indices.length < passwordSize; i++) {
      if (bytes[i] < unbiasedLimit) {
        indices.push(bytes[i] % poolSize)
      }
    }
  }
  return indices
}

async function pickRandomCharsFromPool(pool: string, size: number): Promise<string[]> {
  const indices = await generateUniformIndicesBatch(pool.length, size)
  return indices.map((index) => pool[index])
}

export async function generatePasswordAsync(opts: GeneratorOptions): Promise<string> {
  const enabledPools = buildEnabledPools(opts)
  const charsetPool = enabledPools.join('')

  const requiredCharsPromises = enabledPools.map((set) => pickRandomCharsFromPool(set, 1))
  const requiredCharsNested = await Promise.all(requiredCharsPromises)
  const requiredChars = requiredCharsNested.map((value) => value[0])

  const remainingSize = opts.length - requiredChars.length
  const remainingChars = await pickRandomCharsFromPool(charsetPool, remainingSize)

  const chars = [...requiredChars, ...remainingChars]
  await shuffleChars(chars)

  return chars.join('')
}
