import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../theme/colors'

type ChipProps = {
  label: string
  active: boolean
  onPress: () => void
}

function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      android_ripple={{
        color: `${COLORS.primary}33`,
        borderless: false,
        foreground: true,
      }}
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  )
}

const CHIP_CONFIG = [
  { label: 'Lowercase (a-z)', key: 'lower' },
  { label: 'Uppercase (A-Z)', key: 'upper' },
  { label: 'Numbers (0-9)', key: 'number' },
  { label: 'Symbols (!@#$)', key: 'symbol' },
  { label: 'Avoid ambiguous (lI1O0)', key: 'ambiguous' },
] as const

type OptionKey = (typeof CHIP_CONFIG)[number]['key']
type PasswordFlags = Record<OptionKey, boolean>

type Props = {
  opts: PasswordFlags
  setOpts: React.Dispatch<React.SetStateAction<PasswordFlags>>
}

export default function OptionChips({ opts, setOpts }: Props) {
  const safeToggle = useCallback(
    (key: OptionKey) => {
      const next = { ...opts, [key]: !opts[key] }
      if (!Object.values(next).some(Boolean)) return
      setOpts(next)
    },
    [opts, setOpts]
  )

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
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
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
