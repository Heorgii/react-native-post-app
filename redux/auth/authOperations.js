import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const signup =
  ({ userName, email, password }) =>
  async (dispath, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (err) {
      console.log(err);
    }
  };

export const signin =
  ({ email, password }) =>
  async (dispath, getSatte) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (err) {
      console.log(err);
    }
  };

export const signout = () => async (dispath, getSatte) => {};
