import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { signin } from "../../../redux/auth/authOperations";
const initislState = {
  email: "",
  password: "",
};

export default LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initislState);
  const [isHover, setIsHoiver] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (state.email === "" || state.password === "") {
      return alert("Please fill all fields");
    }
    dispatch(signin(state));
    setState(initislState);
    // navigation.navigate("Home");
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../image/bgImage.jpg")}
          style={styles.main_image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? "-310" : "-0"}
          >
            <View style={styles.form}>
              <Text style={styles.title}>Log in</Text>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isHover === "email" ? "#FF6C00" : "#E8E8E8",
                    marginBottom: 16,
                  }}
                  placeholder="Email"
                  value={state.email}
                  onFocus={() => setIsHoiver("email")}
                  onBlur={() => setIsHoiver(null)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />

                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isHover === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={showPassword}
                  placeholder="Password"
                  onFocus={() => setIsHoiver("password")}
                  onBlur={() => setIsHoiver(null)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />

                <TouchableOpacity
                  style={styles.show_password}
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Text style={styles.show_password__text}>Show</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.form_button}
                onPress={handleSubmit}
              >
                <Text style={styles.form_button__text}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.form_link}>
                  Don't have an account? Sing up
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main_image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingLeft: 16,
    marginHorizontal: 16,
  },
  show_password: {
    position: "absolute",
    bottom: 17,
    left: 340,
  },
  show_password__text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  form_button: {
    ...Platform.select({
      ios: {
        backgroundColor: "#FF6C00",
      },
      android: {
        backgroundColor: "#FF6C33",
      },
    }),
    height: 51,
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
    display: "flex",
    justifyContent: "center",
  },
  form_button__text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  form_link: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
  },
});

// import React, { useState } from "react";
// // import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Dimensions,
//   Text,
//   View,
//   TextInput,
//   TouchableWithoutFeedback,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";
// // import Icon from "react-native-vector-icons/FontAwesome5";
// // import validator from "validator";
// // import { useNavigation } from "@react-navigation/native";
// // import { authSignInUser } from "../Redux/Auth/AuthOperations";
// import { signin } from "../../../redux/auth/authOperations";
// import { useDispatch } from "react-redux";

// export const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [hidePass, setHidePass] = useState(true);
//   const [emailHoverInput, setEmailHoverInput] = useState(false);
//   const [passwordHoverInput, setPasswordHoverInput] = useState(false);
//   // const navigation = useNavigation();

//   const emailHandler = (text) => setEmail(text);
//   const passwordHandler = (text) => setPassword(text);
//   const dispatch = useDispatch();

//   const onLogin = () => {
//     Keyboard.dismiss();
//     // if (validator.isEmail(email)) {
//       Alert.alert("Дані для входу", `${email} + ${password}`);
//       dispatch(signin(email, password));
//     // } else {
//       // Alert.alert("Невірно вказано email");
//     // }
//   };
//   const windowWidth = Dimensions.get("window").width;
//   const windowHeight = Dimensions.get("window").height;

//   return (
//     <View style={styles.wrap}>
//       {/* <StatusBar style="auto" /> */}
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={{ width: windowWidth, height: windowHeight }}>
//           {/* <ImageBackground
//             source={require("../assets/background.png")}
//             style={styles.image}
//           > */}
//             <View style={styles.containerTop}></View>
//             <View style={styles.container}>
//               <KeyboardAvoidingView
//                 behavior={Platform.OS == "ios" ? "padding" : "height"}
//               >
//                 <View style={styles.form}>
//                   <Text style={styles.formTitle}>Увійти</Text>
//                   <View>
//                     <TextInput
//                       value={email}
//                       onChangeText={emailHandler}
//                       placeholder="Адреса електроної пошти"
//                       style={{
//                         ...styles.input,
//                         backgroundColor: emailHoverInput ? "white" : "#F6F6F6",
//                         borderColor: emailHoverInput ? "orange" : "#E8E8E8",
//                       }}
//                       onFocus={() => setEmailHoverInput(true)}
//                       onBlur={() => setEmailHoverInput(false)}
//                     />
//                   </View>
//                   <View>
//                     <TextInput
//                       value={password}
//                       onChangeText={passwordHandler}
//                       placeholder="Пароль"
//                       secureTextEntry={hidePass ? true : false}
//                       style={{
//                         ...styles.input,
//                         backgroundColor: passwordHoverInput
//                           ? "white"
//                           : "#F6F6F6",
//                         borderColor: passwordHoverInput ? "orange" : "#E8E8E8",
//                       }}
//                       onFocus={() => setPasswordHoverInput(true)}
//                       onBlur={() => setPasswordHoverInput(false)}
//                     />
//                     {/* <Icon
//                       style={styles.iconView}
//                       name={hidePass ? "eye-slash" : "eye"}
//                       onPress={() => setHidePass(!hidePass)}
//                     /> */}
//                   </View>
//                   <TouchableOpacity
//                     activeOpacity={0.7}
//                     style={styles.btn}
//                     onPress={onLogin}
//                   >
//                     <Text style={styles.btnText}>Увійти</Text>
//                   </TouchableOpacity>
//                   {/* <TouchableOpacity
//                     onPress={() => navigation.navigate("Registration")}
//                   >
//                     <Text style={styles.logInTitle}>
//                       Відсутній акаунт? Зареєструватися
//                     </Text>
//                   </TouchableOpacity> */}
//                 </View>
//               </KeyboardAvoidingView>
//             </View>
//           {/* </ImageBackground> */}
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// };