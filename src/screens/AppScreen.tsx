import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import { generatePasswordAsync } from '../utils/passwordGenerator'
import PasswordPanel from '../components/PasswordPanel'
import StrengthMeter from '../components/StrengthMeter'
import LengthSlider from '../components/LengthSlider'
import OptionChips from '../components/OptionChips'
import { COLORS } from '../theme/colors'

export default function AppScreen() {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({
    lower: true,
    upper: true,
    number: true,
    symbol: false,
  })
  const [password, setPassword] = useState('')

  const sequenceRef = useRef(0)
  useEffect(() => {
    const recentSequence = ++sequenceRef.current
    ;(async () => {
      const password = await generatePasswordAsync({ ...opts, length })
      if (recentSequence === sequenceRef.current) {
        setPassword(password)
        Haptics.selectionAsync().catch(() => {})
      }
    })()
  }, [opts, length])

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.secondary, COLORS.background]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.page}>
          <LinearGradient
            style={styles.headerBar}
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.headerTitle}>Password Generator</Text>
          </LinearGradient>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Generated password</Text>

            <PasswordPanel
              password={password}
              onRefresh={() => setOpts((opts) => ({ ...opts }))}
            />

            <StrengthMeter options={{ ...opts, length }} />
          </View>

          <View style={styles.card}>
            <LengthSlider length={length} onChange={setLength} />

            <OptionChips opts={opts} setOpts={setOpts} />

            <Text style={styles.note}>
              Password updates automatically as you change options. No history is stored.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollview: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  page: {
    width: '100%',
    maxWidth: 720,
    gap: 16,
  },
  headerBar: {
    borderRadius: 24,
    padding: 16,
  },
  headerTitle: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.backgroundVariant,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    gap: 16,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  note: {
    color: COLORS.muted,
    fontSize: 12,
  },
})
