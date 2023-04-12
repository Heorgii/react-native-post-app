import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const signup =
  ({ userName, email, password }) =>
  async (dispath, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = auth.currentUser;
      await updateProfile(currentUser, { displayName: userName });
      dispath(
        authSlice.actions.updateUserProfile({
          userId: auth.currentUser.uid(),
          userName: auth.currentUser.displayName,
        })
      );
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

export const authStateChangeUser = (dispath, getSatte) => async () => {
  await auth.onAuthStateChanged((user) => setUser(user));
};
