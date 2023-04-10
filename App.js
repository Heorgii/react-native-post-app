import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { auth } from "./firebase/config";
import { useState } from "react";

const fonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(user);

  if (!fonts) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
