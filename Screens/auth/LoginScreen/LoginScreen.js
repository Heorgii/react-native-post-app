import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";

const initislState = {
    email: '',
    password: '',
}

export default RegistrationScreen = ({ navigation }) => {
    const [state, setState] = useState(initislState);
    const [isHover, setIsHoiver] = useState(null);
    const [showPassword, setShowPassword] = useState(true);

    const handleSubmit = () => {
        if (state.email === '' || state.password === '') {
            return alert('Please fill all fields');
        }
        console.log(state);
        setState(initislState);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? '-310' : '-0'}
        >
            <View style={styles.form}>

                <Text style={styles.title}>Log in</Text>
                <View>

                    <TextInput style={{
                        ...styles.input, borderColor:
                            isHover === 'email' ? '#FF6C00' : '#E8E8E8', marginBottom: 16
                    }}
                        placeholder="Email"
                        value={state.email}
                        onFocus={() => setIsHoiver('email')}
                        onBlur={() => setIsHoiver(null)}
                        onChangeText={(value) =>
                            setState((prevState) => ({ ...prevState, email: value }))} />

                    <TextInput style={{
                        ...styles.input, borderColor:
                            isHover === 'password' ? '#FF6C00' : '#E8E8E8',
                    }} secureTextEntry={showPassword}
                        placeholder="Password"
                        onFocus={() => setIsHoiver('password')}
                        onBlur={() => setIsHoiver(null)}
                        value={state.password}
                        onChangeText={(value) =>
                            setState((prevState) => ({ ...prevState, password: value }))}
                    />

                    <TouchableOpacity style={styles.show_password}
                        onPress={() => setShowPassword(prev => !prev)}>
                        <Text style={styles.show_password__text}>Show</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity activeOpacity={0.5}
                    style={styles.form_button} onPress={handleSubmit}>
                    <Text style={styles.form_button__text}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.form_link}>Don't have an account? Sing up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
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
        marginTop: 32,
        marginBottom: 32,
        fontFamily: 'Roboto-Medium',
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 0.01,
        color: '#212121',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        height: 50,
        paddingLeft: 16,
        marginHorizontal: 16,
    },
    show_password: {
        position: 'absolute',
        bottom: 17,
        left: 340,
    },
    show_password__text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#1B4371',
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
        height: 51,
        borderRadius: 100,
        marginHorizontal: 16,
        marginTop: 43,
        display: 'flex',
        justifyContent: 'center',
    },
    form_button__text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    form_link: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#1B4371',
        marginTop: 16,
    },
});