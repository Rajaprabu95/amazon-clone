import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA66ZmqiS9dxoS9M0wk4zcwCKSr_stVwc0",
  authDomain: "clone-dcbf0.firebaseapp.com",
  projectId: "clone-dcbf0",
  storageBucket: "clone-dcbf0.appspot.com",
  messagingSenderId: "61283971976",
  appId: "1:61283971976:web:3f1c66b50ed891ed7b803d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
