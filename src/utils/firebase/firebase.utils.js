import { initializeApp } from 'firebase/app';
import { getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZ9QRBIVA1aWE2dnw05V8L0cR81FXjJIg",
    authDomain: "crwn-clothing-db-61809.firebaseapp.com",
    projectId: "crwn-clothing-db-61809",
    storageBucket: "crwn-clothing-db-61809.appspot.com",
    messagingSenderId: "311561728894",
    appId: "1:311561728894:web:42e05a03af44321db7792f",
    measurementId: "G-1FRNCHN99C"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };

    //if user data exists

    // if user does not exist
    //create / set the document with the data from userAuth in my collection



  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

  };

