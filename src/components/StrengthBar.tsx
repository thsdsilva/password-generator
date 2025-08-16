import React from 'react'
import { View, StyleSheet } from 'react-native'
import { GeneratorOptions } from '../utils/passwordGenerator'

export type Strength = 'Weak' | 'Medium' | 'Fair' | 'Strong' | 'Excellent' | 'Exceptional'

function estimateEntropyBits(options: GeneratorOptions): number {
  let space = 26
  if (options.upper) space += 26
  if (options.number) space += 10
  if (options.symbol) space += 28

  return options.length * Math.log2(space)
}

export function calculateStrength(options: GeneratorOptions): Strength {
  const bits = estimateEntropyBits(options)

  if (bits >= 95) return 'Exceptional'
  if (bits >= 80) return 'Excellent'
  if (bits >= 65) return 'Strong'
  if (bits >= 50) return 'Fair'
  if (bits >= 35) return 'Medium'
  return 'Weak'
}

function strengthlevelColor(levelName: Strength): {
  levelIndex: number
  levelColor: string
} {
  if (levelName === 'Weak') return { levelIndex: 1, levelColor: '#ff6b6b' }
  if (levelName === 'Medium') return { levelIndex: 2, levelColor: '#f39c12' }
  if (levelName === 'Fair') return { levelIndex: 3, levelColor: '#f1c40f' }
  if (levelName === 'Strong') return { levelIndex: 4, levelColor: '#2ecc71' }
  if (levelName === 'Excellent') return { levelIndex: 5, levelColor: '#00a8ff' }
  return { levelIndex: 6, levelColor: '#6c5ce7' }
}

export default function StrengthBar({ strength }: { strength: Strength }) {
  const { levelIndex, levelColor } = strengthlevelColor(strength)

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={i}
            style={[styles.block, i < levelIndex && { backgroundColor: levelColor }]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  block: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#d7dbf5',
  },
})
