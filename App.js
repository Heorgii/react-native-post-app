import { ImageBackground, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './Screens/auth/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen/LoginScreen';
import PostsScreen from './Screens/main/PostsScreen';
import CreatePostsScreen from './Screens/main/CreatePostsScreen';
import ProfileScreen from './Screens/main/ProfileScreen';


const fonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

const keyboardHide = () => {
  Keyboard.dismiss();
}


const useRoute = (isAuth) => {
  if (!isAuth) {
    return (


      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name='Register' component={RegistrationScreen} />

        <AuthStack.Screen
          options={{ headerShown: false }}
          name='Login' component={LoginScreen} />
      </AuthStack.Navigator>

      //    
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require('./Screens/image/bgImage.jpg')}
          style={styles.image}>

          <NavBtnStack.Navigator>
            <NavBtnStack.Screen name='Posts' component={PostsScreen} />
            <NavBtnStack.Screen name='Create Posts' component={CreatePostsScreen} />
            <NavBtnStack.Screen name='Profile' component={ProfileScreen} />
          </NavBtnStack.Navigator>
          
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const AuthStack = createStackNavigator();
const NavBtnStack = createBottomTabNavigator();

export default function App() {
  const routing = useRoute(null);

  if (!fonts) {
    return null;
  }

  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});
