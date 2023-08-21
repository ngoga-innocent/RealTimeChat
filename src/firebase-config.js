// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    const firebaseConfig = {
        apiKey: "AIzaSyAFu9NJ_NJY_3uHUPknXPk7_8WWd4djjuM",
        authDomain: "mobishopchat.firebaseapp.com",
        databaseURL: "https://mobishopchat-default-rtdb.firebaseio.com",
        projectId: "mobishopchat",
        storageBucket: "mobishopchat.appspot.com",
        messagingSenderId: "12559458870",
        appId: "1:12559458870:web:6aef463674d022361e2e97",
        measurementId: "G-K26YB3WRWQ"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      export const db=getDatabase(app)
