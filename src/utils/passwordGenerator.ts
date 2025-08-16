import * as Crypto from 'expo-crypto'
import { Strength } from '../components/StrengthBar'

export type GeneratorOptions = {
  length: number
  lower: boolean
  upper: boolean
  number: boolean
  symbol: boolean
}

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUNBER = '0123456789'
const SYMBOL = '!@#$%^&*()-_=+[]{};:,.<>/?'

function buildPool(options: GeneratorOptions): string {
  return (
    LOWER +
    (options.upper ? UPPER : '') +
    (options.number ? NUNBER : '') +
    (options.symbol ? SYMBOL : '')
  )
}

async function generateUniformIndicesBatch(
  poolSize: number,
  passwordSize: number
): Promise<number[]> {
  const indices: number[] = []
  const isPerfectDivision = poolSize % passwordSize === 0
  const unbiasedLimit = Math.floor(256 / poolSize) * poolSize
  const pickBatchSize = (remaining: number) => Math.max(64, remaining * 2)

  while (indices.length < passwordSize) {
    const remaining = passwordSize - indices.length
    const batchSize = pickBatchSize(remaining)
    const bytes: Uint8Array = await Crypto.getRandomBytesAsync(batchSize)

    for (let i = 0; i < bytes.length && indices.length < passwordSize; i++) {
      if (isPerfectDivision || bytes[i] < unbiasedLimit) {
        indices.push(bytes[i] % poolSize)
      }
    }
  }
  return indices
}

export async function generatePasswordAsync(options: GeneratorOptions): Promise<string> {
  const pool = buildPool(options)
  const poolSize = pool.length
  const passwordSize = options.length
  const indices = await generateUniformIndicesBatch(poolSize, passwordSize)

  let password = ''
  for (let i = 0; i < indices.length; i++) {
    password += pool[indices[i]]
  }
  return password
}
