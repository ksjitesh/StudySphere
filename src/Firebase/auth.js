import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "./firebase";

// Email Login

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

// Signup

export const signupUser = async (
  fullName,
  email,
  password
) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await setDoc(
    doc(db, "users", userCredential.user.uid),
    {

      fullName,

      email,

      course: "",

      semester: "",

      createdAt: serverTimestamp(),

    }
  );

  return userCredential;

};

// Google Login

const provider = new GoogleAuthProvider();

export const googleLogin = () => {
  return signInWithPopup(auth, provider);
};

// Forgot Password

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Logout

export const logoutUser = () => {
  return signOut(auth);
};