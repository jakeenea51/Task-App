// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /*
  ------------------------------------
  ENTER YOUR FIREBASE CONFIG INFO HERE
  ------------------------------------
  */
};

// Initialize Firebase
export const fire = initializeApp(firebaseConfig);

export const auth = getAuth(fire);

export const db = getFirestore(fire);