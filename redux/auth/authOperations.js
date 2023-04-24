import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const signup =
  ({ userName, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = auth.currentUser;
      await updateProfile(currentUser, { displayName: userName });
      dispatch(
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
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
   
      // const user = await signInWithEmailAndPassword(auth, email, password);
      // const currentUser = auth.currentUser;
      // dispatch(
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

export const signout = () => async (dispatch, getSatte) => {
  await signOut();
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: auth.currentUser.uid(),
          userName: auth.currentUser.displayName,
        })
      );
    }
  });
};
