import { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import Slider from '@react-native-community/slider'
import PasswordModal from './components/passwordModal'

export function Home() {
  const [size, setSize] = useState(10)
  const [password, setpassword] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let generatedPassword = ""
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      generatedPassword += charset[randomIndex]
    }
    setpassword(generatedPassword)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.indicator}>{size} characters</Text>

      <Slider
        style={styles.slider}
        minimumValue={6}
        maximumValue={20}
        value={size}
        onValueChange={(value) => setSize(Math.round(value))}
      />

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate password</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <PasswordModal password={password} handleClose={() => setModalVisible(false) } />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginBottom: 48,
  },
  indicator: {
    fontSize: 20,
    fontWeight: "bold",
  },
  slider: {
    height: 50,
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
  },
  button: {
    backgroundColor: "#392DE9",
    width: "80%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
})