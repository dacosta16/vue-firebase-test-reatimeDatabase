import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

let config = {
    apiKey: "AIzaSyBEeKDYOVWpN7-8bp0_Hxz0qBYLbg4AHHI",
    authDomain: "export-test-2c683.firebaseapp.com",
    databaseURL: "https://export-test-2c683-default-rtdb.firebaseio.com",
    projectId: "export-test-2c683",
    storageBucket: "export-test-2c683.appspot.com",
    messagingSenderId: "934119999282",
    appId: "1:934119999282:web:192062ad518c4034d9b92b"
};

firebase.initializeApp(config);

export default firebase.database();