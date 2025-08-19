import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GeneratorOptions } from '../utils/passwordGenerator'
import { COLORS } from '../theme/colors'

export type Strength = 'Weak' | 'Medium' | 'Fair' | 'Strong' | 'Excellent' | 'Exceptional'

export function estimateEntropyBits(opts: GeneratorOptions): number {
  let space = 0
  if (opts.lower) space += 26
  if (opts.upper) space += 26
  if (opts.number) space += 10
  if (opts.symbol) space += 28
  if (space <= 0) return 0
  return opts.length * Math.log2(space)
}

export function calculateStrength(opts: GeneratorOptions): Strength {
  const bits = estimateEntropyBits(opts)

  if (bits >= 95) return 'Exceptional'
  if (bits >= 80) return 'Excellent'
  if (bits >= 65) return 'Strong'
  if (bits >= 50) return 'Fair'
  if (bits >= 35) return 'Medium'
  return 'Weak'
}

export function strengthColor(level: Strength): {
  index: number
  color: string
} {
  if (level === 'Weak') return { index: 1, color: '#ff6b6b' }
  if (level === 'Medium') return { index: 2, color: '#f39c12' }
  if (level === 'Fair') return { index: 3, color: '#f1c40f' }
  if (level === 'Strong') return { index: 4, color: '#2ecc71' }
  if (level === 'Excellent') return { index: 5, color: '#00a8ff' }
  return { index: 6, color: '#6c5ce7' }
}

type Props = {
  options: GeneratorOptions
}

export default function StrengthMeter({ options }: Props) {
  const strength = useMemo(() => calculateStrength(options), [options])
  const { index, color } = useMemo(() => strengthColor(strength), [strength])

  return (
    <View style={styles.container}>
      <Text style={[styles.weight, { color }]}>{strength}</Text>

      <View style={styles.row}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={[styles.block, i < index && { backgroundColor: color }]} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  weight: { fontWeight: '800' },
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  block: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.neutral,
  },
})
