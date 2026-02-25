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
type CharKey = Exclude<OptionKey, 'ambiguous'>

function isCharKey(key: OptionKey): key is CharKey {
  return key !== 'ambiguous'
}

type PasswordFlags = Record<OptionKey, boolean>
type Props = {
  opts: PasswordFlags
  setOpts: React.Dispatch<React.SetStateAction<PasswordFlags>>
}

export default function OptionChips({ opts, setOpts }: Props) {
  const safeToggle = useCallback(
    (key: OptionKey) => {
      setOpts((currentState) => {
        if (key === 'ambiguous') {
          return { ...currentState, ambiguous: !currentState.ambiguous }
        }

        if (isCharKey(key)) {
          const activeCount =
            (currentState.lower ? 1 : 0) +
            (currentState.upper ? 1 : 0) +
            (currentState.number ? 1 : 0) +
            (currentState.symbol ? 1 : 0)

          const willTurnOff = currentState[key] === true
          const isLastActive = activeCount === 1

          if (willTurnOff && isLastActive) {
            return currentState
          }

          return { ...currentState, [key]: !currentState[key] }
        }

        return currentState
      })
    },
    [setOpts]
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
    borderColor: COLORS.borderVariant,
    backgroundColor: COLORS.backgroundVariant,
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
