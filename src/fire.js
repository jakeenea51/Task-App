// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ88oIobXWz4bQKt4WKy7K9ZWzb4rbKHs",
  authDomain: "login-73d22.firebaseapp.com",
  projectId: "login-73d22",
  storageBucket: "login-73d22.appspot.com",
  messagingSenderId: "17763907125",
  appId: "1:17763907125:web:6541177c4412509ef4237c"
};

// Initialize Firebase
export const fire = initializeApp(firebaseConfig);

export const auth = getAuth(fire);

export const db = getFirestore(fire);