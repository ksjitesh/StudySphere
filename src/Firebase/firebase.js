import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYrhZVa4I1_TkBVE5NcWc5WxCT7IH2MlM",
  authDomain: "studysphere-70b10.firebaseapp.com",
  projectId: "studysphere-70b10",
  storageBucket: "studysphere-70b10.firebasestorage.app",
  messagingSenderId: "244751659159",
  appId: "1:244751659159:web:eaee99fd9198490dea39d2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;