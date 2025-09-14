import React, { useMemo, useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import * as Haptics from 'expo-haptics'
import { Copy, RefreshCw, Check } from 'lucide-react-native'
import { COLORS } from '../theme/colors'

type Props = {
  password: string
  onRefresh: () => void
}

export default function PasswordPanel({ password, onRefresh }: Props) {
  const [copied, setCopied] = useState(false)
  const copyState = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = async () => {
    await Clipboard.setStringAsync(password)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {})

    if (copyState.current) {
      clearTimeout(copyState.current)
      copyState.current = null
    }

    setCopied(true)

    copyState.current = setTimeout(() => {
      setCopied(false)
      copyState.current = null
    }, 2000)
  }

  useEffect(() => {
    setCopied(false)
    if (copyState.current) {
      clearTimeout(copyState.current)
      copyState.current = null
    }
  }, [password])

  const refresh = () => {
    onRefresh()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
  }

  const [textAreaWidth, setTextAreaWidth] = useState(0)
  const [charWidth, setCharWidth] = useState(0)

  const PROBE_TEXT = 'Aa0#Aa0#Aa0#Aa0#Aa0#'

  const onTextAreaLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    if (width && width !== textAreaWidth) setTextAreaWidth(width)
  }

  const onProbeLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    const measured = width > 0 ? width / PROBE_TEXT.length : 0
    if (measured && charWidth === 0) {
      setCharWidth(measured)
    } else if (!measured && charWidth === 0) {
      setCharWidth(0.6 * 18)
    }
  }

  const charsPerLine = useMemo(() => {
    if (!textAreaWidth || !charWidth) return 0
    const maxChars = Math.floor((textAreaWidth - 10) / charWidth)
    return Math.max(1, maxChars)
  }, [textAreaWidth, charWidth])

  const formattedPassword = useMemo(() => {
    if (!password || !charsPerLine) return password
    const regExp = new RegExp(`.{1,${charsPerLine}}`, `g`)
    const parts = password.match(regExp)
    return parts ? parts.join(`\n`) : password
  }, [password, charsPerLine])

  return (
    <View style={styles.passwordRow}>
      <View style={styles.passwordField}>
        <View style={styles.textArea} onLayout={onTextAreaLayout}>
          {charWidth === 0 && (
            <Text style={[styles.passwordText, styles.probe]} onLayout={onProbeLayout}>
              {PROBE_TEXT}
            </Text>
          )}
          <Text style={styles.passwordText} selectable>
            {formattedPassword}
          </Text>
        </View>

        <Pressable onPress={copy} hitSlop={8}>
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </Pressable>
      </View>

      <Pressable
        onPress={refresh}
        style={styles.refreshButton}
        android_ripple={{ color: `${COLORS.background}40`, borderless: true }}
      >
        <RefreshCw size={20} color={COLORS.background} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  passwordField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 16,
    backgroundColor: `${COLORS.secondary}2e`,
    minHeight: 48,
    gap: 8,
  },
  textArea: {
    flex: 1,
  },
  passwordText: {
    flexShrink: 1,
    fontFamily: 'monospace',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.text,
  },
  probe: {
    position: 'absolute',
    opacity: 0,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
