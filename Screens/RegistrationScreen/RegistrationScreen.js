import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";

export default RegistrationScreen = () => {
    const [isActiveKeyBoard, setIsActiveKeyBoard] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <View style={{ ...styles.form, padding: isActiveKeyBoard ? 32 : 1 }}>

                <Text style={styles.title}>Registration</Text>

                <TextInput style={styles.input} placeholder="Username" onFocus={() => setIsActiveKeyBoard(false)} />
                <TextInput style={{ ...styles.input, marginBottom: 16, marginTop: 16 }} placeholder="Email" onFocus={() => setIsActiveKeyBoard(false)} />
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onFocus={() => setIsActiveKeyBoard(false)} />

                <TouchableOpacity activeOpacity={0.5}
                    style={styles.form_button} >
                    <Text style={styles.form_button__text}>Sing up</Text>
                </TouchableOpacity>
                <Text style={styles.form_text}>Already have an account? Log in</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFFFFF',
        height: 549,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    title: {
        marginTop: 92,
        marginBottom: 32,
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 0.01,
        color: '#212121',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        height: 50,
        paddingLeft: 16,
        marginHorizontal: 16,
    },
    form_button: {
        ...Platform.select({
            ios: {
                backgroundColor: '#FF6C00',
            },
            android: {
                backgroundColor: '#FF6C33',
            }
        }),
        // display: 'none',
        height: 51,
        borderRadius: 100,
        marginHorizontal: 16,
        marginTop: 43,
        display: 'flex',
        justifyContent: 'center',
    },
    form_button__text: {
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    form_text: {
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#1B4371',
        marginTop: 16,
    },
});