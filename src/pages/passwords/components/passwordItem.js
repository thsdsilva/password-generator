import { useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function PasswordItem({ data, removePassword }) {
  const [show, setShow] = useState(false)

  return (
    <Pressable onLongPress={removePassword} style={styles.container}>
      <View style={styles.passwordContainer}>
        {show ? (
          <Text style={styles.content}>{data} </Text>
        ) : (
          <View style={styles.mask} />
        )}
      </View>

      <Pressable onPress={() => setShow(!show)} hitSlop={14}>
        <Ionicons
          name={show ? "eye-outline" : "eye-off-outline"}
          size={24}
          color="#fff"
        />
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordContainer: {
    flex: 1,
  },
  content: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  mask: {
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignSelf: "flex-start",
    width: "45%",
  },
})
