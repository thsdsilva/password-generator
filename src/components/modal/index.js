import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard';

export function PasswordModal({ password, handleClose }) {
    async function handleCopyPassword() {
        await Clipboard.setStringAsync(password)
        alert('Password copied to clipboard')
        handleClose()
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Text style={styles.message}>Generated password</Text>

                <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.passwordText}>{password}</Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSave]}>
                        <Text style={styles.buttonSaveText}>Save password</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24, 24, 24, 0.6)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white',
        width: '85%',
        paddingTop: 24,
        paddingBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 24
    },
    innerPassword: {
        backgroundColor: '#0e0e0e',
        width: '90%',
        padding: 14,
        borderRadius: 8,
    },
    passwordText: {
        color: 'white',
        textAlign: 'center',
    },
    buttonArea: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 14,
    },
    buttonSave: {
        backgroundColor: '#392de9',
        padding: 8,
        borderRadius: 8,
    },
    buttonSaveText: {
        color: 'white',
        fontWeight: 'bold',
    }
})