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

export function buildPool(opts: GeneratorOptions): string {
  let lower = opts.lower ? 'abcdefghijklmnopqrstuvwxyz' : ''
  let upper = opts.upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''
  let number = opts.number ? '0123456789' : ''
  let symbol = opts.symbol ? '!@#$%^&*()-_=+[]{};:,.<>/?' : ''

  let pool = lower + upper + number + symbol

  if (opts.ambiguous) {
    pool = pool
      .split('')
      .filter((char) => !AMBIGUOUS.includes(char))
      .join('')
  }

  return pool
}

export function calculatePoolSize(opts: GeneratorOptions): number {
  return buildPool(opts).length
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

export async function generatePasswordAsync(opts: GeneratorOptions): Promise<string> {
  const pool = buildPool(opts)
  if (pool.length === 0) {
    throw new Error('Select at least one character type')
  }

  const indices = await generateUniformIndicesBatch(pool.length, opts.length)

  let password = ''
  for (let i = 0; i < indices.length; i++) {
    password += pool[indices[i]]
  }
  return password
}
