import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    return await signInWithPopup(auth, googleProvider);
     
  } catch (error: any) {
    if (error.code === "auth/popup-closed-by-user") {
      console.warn("Popup was closed before authentication completed.");
      return null;
    }
    throw error;
  }
};
export const logout = async () => {
  return signOut(auth);
};
