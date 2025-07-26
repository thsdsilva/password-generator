import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native"
import * as Clipboard from "expo-clipboard"
import useStorage from "../../../hooks/useStorage"

export default function PasswordModal({ password, handleClose }) {
  const { saveItem } = useStorage()

  async function handlePassword(action) {
    if (action === "copy") {
      await Clipboard.setStringAsync(password)
      alert("Password copied to clipboard")
    } else if (action === "save") {
      await saveItem("@pass", password)
      alert("Password saved successfully")
    }
    handleClose()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>Generated password</Text>

        <Pressable
          style={styles.passwordContainer}
          onLongPress={() => handlePassword("copy")}
        >
          <Text style={styles.passwordText}>{password}</Text>
        </Pressable>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBack]}
            onPress={handleClose}
          >
            <Text style={styles.buttonBackText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={() => handlePassword("save")}
          >
            <Text style={styles.buttonSaveText}>Save password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24, 24, 24, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  passwordContainer: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  buttonArea: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    marginTop: 14,
    marginBottom: 14,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBack: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonBackText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonSave: {
    backgroundColor: "#392de9",
    padding: 8,
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})
