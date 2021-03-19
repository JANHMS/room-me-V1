import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Replace the following with the config for your own Firebase project
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  databaseURL: "https://room-me-29534-default-rtdb.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyAOU-yobcA2Oi0OAuAcflvkJVTX7uSDVQw",
  authDomain: "room-me-29534.firebaseapp.com",
  projectId: "room-me-29534",
  storageBucket: "room-me-29534.appspot.com",
  messagingSenderId: "236014984298",
  appId: "1:236014984298:web:ed01f13ac1e9829dedbe13",
  measurementId: "G-3NLN7GNFTC"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
const { Timestamp } = firebase.firestore
export { Timestamp }