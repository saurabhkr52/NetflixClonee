import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5FxniRFcORwA3vOwnygsxr9xPzSekXV4",
    authDomain: "react-netflix-clone-e746b.firebaseapp.com",
    projectId: "react-netflix-clone-e746b",
    storageBucket: "react-netflix-clone-e746b.appspot.com",
    messagingSenderId: "936071666511",
    appId: "1:936071666511:web:6de5c3469b4fa263c2c33a",
    measurementId: "G-ML9R8BDC20",
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
// I have copied it from firebase (create a project and other stuff).
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional