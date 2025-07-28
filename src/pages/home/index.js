import React, { useRef, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Switch,
  Animated,
} from "react-native"
import { Slider } from "@miblanchard/react-native-slider"
import PasswordModal from "./components/passwordModal"

export function Home() {
  const [size, setSize] = useState(10)
  const [password, setPassword] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [useSymbols, setUseSymbols] = useState(false)

  const scale = useRef(new Animated.Value(1)).current
  const hasMoved = useRef(false)

  function generatePassword() {
    const count = Math.floor(size)
    const charset = useSymbols
      ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
      : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let pwd = ""
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      pwd += charset[randomIndex]
    }
    setPassword(pwd)
    setModalVisible(true)
  }

  function handleSlidingStart() {
    hasMoved.current = false
  }

  function handleValueChange(value) {
    setSize(value)
    if (!hasMoved.current && value !== size) {
      hasMoved.current = true
      Animated.spring(scale, {
        toValue: 1.4,
        friction: 6,
        useNativeDriver: true,
      }).start()
    }
  }

  function handleSlidingComplete() {
    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start()
    hasMoved.current = false
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.indicator}>{Math.floor(size)} characters</Text>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          value={size}
          onSlidingStart={handleSlidingStart}
          onValueChange={handleValueChange}
          onSlidingComplete={handleSlidingComplete}
          minimumValue={6}
          maximumValue={20}
          step={0}
          renderThumbComponent={() => (
            <Animated.View style={[styles.thumb, { transform: [{ scale }] }]} />
          )}
          minimumTrackTintColor="#018786"
          thumbTintColor="#018786"
          maximumTrackTintColor="#BDBDBD"
        />
      </View>

      <View style={styles.useSymbolsContainer}>
        <Text style={styles.label}>Include special characters</Text>
        <Switch
          value={useSymbols}
          onValueChange={setUseSymbols}
          thumbColor={useSymbols ? "#5568fe" : "#a0a0a0"}
          trackColor={{ false: "#d3d3d3", true: "#b0bfff" }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate password</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <PasswordModal password={password} handleClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 40,
  },
  indicator: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a4a68",
    marginBottom: 12,
  },
  sliderContainer: {
    width: "80%",
    paddingHorizontal: 14,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#018786",
  },
  useSymbolsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#2d2e5f",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4c5cff",
    width: "80%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
})
