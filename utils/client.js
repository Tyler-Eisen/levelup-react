import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseCredentials = {
  apiKey: "AIzaSyDrpBedPHNH_xabYg9Wj6GJZ5HWXaSJp8Q",
  authDomain: "levelup-715a5.firebaseapp.com",
};

const clientCredentials = {
  ...firebaseCredentials,
  databaseURL: "http://localhost:8000",
};

if (!firebase.apps.length) {
  firebase?.initializeApp(firebaseCredentials);
}

export { firebase, clientCredentials };
