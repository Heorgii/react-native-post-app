import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import Main from "./Components/Main";

const fonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {

  if (!fonts) {
    return null;
  }

  return (
    <Provider store={store}>
      <MaiN />
    </Provider>
  );
}
