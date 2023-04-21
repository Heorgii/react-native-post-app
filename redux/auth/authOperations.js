import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

// const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

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
          stateChange: true,
        })
      );
      console.log("user", user);
    } catch (err) {
      console.log(err);
    }
  };

export const signin =
  ({ email, password }) =>
  async (dispath, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // const currentUser = auth.currentUser;
      // dispath(
      //   authSlice.actions.updateUserProfile({
      //     userId: currentUser.uid(),
      //     userName: currentUser.displayName,
      //     stateChange: true,
      //   })
      // );
      console.log("user", user);
    } catch (err) {
      console.log(err);
    }
  };

export const signout = () => async (dispath, getSatte) => {
  await signOut();
  dispath(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispath, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      dispath(authSlice.actions.authStateChange({ stateChange: true }));

      dispath(
        authSlice.actions.updateUserProfile({
          userId: auth.currentUser.uid(),
          userName: auth.currentUser.displayName,
        })
      );
    }
  });
};
