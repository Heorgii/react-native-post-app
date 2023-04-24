import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
