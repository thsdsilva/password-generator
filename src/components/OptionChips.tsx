import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { GeneratorOptions } from '../utils/passwordGenerator'
import { COLORS } from '../theme/colors'

type OptionKey = 'lower' | 'upper' | 'number' | 'symbol'

type PasswordFlags = Omit<GeneratorOptions, 'length'>

type Props = {
  opts: PasswordFlags
  setOpts: React.Dispatch<React.SetStateAction<PasswordFlags>>
}

const CHIP_CONFIG = [
  { label: 'Lowercase (a-z)', key: 'lower' },
  { label: 'Uppercase (A-Z)', key: 'upper' },
  { label: 'Numbers (0-9)', key: 'number' },
  { label: 'Special (!@#$)', key: 'symbol' },
] as const

function Chip({
  label,
  active,
  onPress,
}: {
  label: string
  active: boolean
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && { opacity: 0.85 },
      ]}
      hitSlop={8}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  )
}

export default function OptionChips({ opts, setOpts }: Props) {
  function safeToggle(key: OptionKey) {
    const changedState = { ...opts, [key]: !opts[key] }
    if (!Object.values(changedState).some(Boolean)) return
    setOpts(changedState)
  }

  return (
    <View style={styles.chipsRow}>
      {CHIP_CONFIG.map(({ label, key }) => (
        <Chip
          key={key}
          label={label}
          active={opts[key]}
          onPress={() => safeToggle(key)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  chipActive: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}22`,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  chipTextActive: {
    color: COLORS.primary,
  },
})
