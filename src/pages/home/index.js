import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native"
import Slider from "@react-native-community/slider"
import PasswordModal from "./components/passwordModal"

export function Home() {
  const [size, setSize] = useState(10)
  const [password, setpassword] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [useSymbols, setUseSymbols] = useState(false)

  function generatePassword() {
    const charset = useSymbols
      ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
      : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = ""
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    setpassword(password)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.indicator}>{size} characters</Text>

      <Slider
        style={styles.slider}
        minimumValue={6}
        maximumValue={20}
        value={size}
        onValueChange={(value) => setSize(Math.round(value))}
      />

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

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
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
    marginBottom: 48,
  },
  indicator: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a4a68",
  },
  slider: {
    width: "80%",
    height: 50,
  },
  useSymbolsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
})
