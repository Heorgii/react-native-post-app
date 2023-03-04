import { ImageBackground, StyleSheet, View } from 'react-native';
// import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./Screens/image/bgImage.jpg")}
        style={styles.image}>
        {/* <RegistrationScreen></RegistrationScreen> */}
        <LoginScreen />
      </ImageBackground>
    </View>
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
