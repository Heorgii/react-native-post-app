import React from "react";
import { ImageBackground, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import RegistrationScreen from './Screens/auth/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen/LoginScreen';
import Home from "./Screens/main/Home";

const keyboardHide = () => {
    Keyboard.dismiss();
}

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <TouchableWithoutFeedback onPress={keyboardHide}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('./Screens/image/bgImage.jpg')}
                        style={styles.image}>
                        <AuthStack.Navigator>
                            <AuthStack.Screen
                                options={{ headerShown: false }}
                                name='Register' component={RegistrationScreen} />

                            <AuthStack.Screen
                                options={{ headerShown: false }}
                                name='Login' component={LoginScreen} />

                            <AuthStack.Screen
                                options={{ headerShown: false }}
                                name='Home' component={Home} />
                        </AuthStack.Navigator>
                    </ImageBackground >
                </View >
            </TouchableWithoutFeedback >
        );
    }

    return (
        <Home />
    );
}