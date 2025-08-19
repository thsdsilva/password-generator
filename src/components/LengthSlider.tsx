import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'
import { COLORS } from '../theme/colors'

type Props = {
  length: number
  onChange: (length: number) => void
  minimum?: number
  maximum?: number
  step?: number
}

export default function LengthSlider({
  length,
  onChange,
  minimum = 4,
  maximum = 64,
  step = 1,
}: Props) {
  return (
    <View style={styles.container}>
      <Slider
        value={length}
        onValueChange={(selectedLength) => onChange(selectedLength[0])}
        minimumValue={minimum}
        maximumValue={maximum}
        step={step}
        trackStyle={styles.track}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.secondary}
        thumbStyle={styles.thumb}
        thumbTintColor={COLORS.primary}
      />
    </View>
  )
}

const THUMB_SIZE = 26
const styles = StyleSheet.create({
  container: { width: '100%' },
  track: {
    height: 10,
    borderRadius: 999,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    elevation: 2,
  },
})
