import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateAvatar,
} from "../authReducer";

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      const { uid, displayName, photoURL } = auth.currentUser;
      const userEmail = auth.currentUser.email;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email: userEmail,
          avatar: photoURL,
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error.message);
  }
};

export const authStateChanged = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, photoURL, email } = auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          avatar: photoURL,
          email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export const updateUserAvatar = (avatar) => async (dispatch) => {
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: avatar,
      });

      const { photoURL } = auth.currentUser;

      dispatch(updateAvatar({ avatar: photoURL }));
    } catch (error) {
      dispatch(authError(error.message));
    }
  }
};
