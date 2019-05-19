import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCRJzhMb0owrJo_Vvfiw-NotuKJURMzPA8",
    authDomain: "raidsapi.firebaseapp.com",
    databaseURL: "https://raidsapi.firebaseio.com",
    projectId: "raidsapi",
    storageBucket: "raidsapi.appspot.com",
    messagingSenderId: "323513679490",
    appId: "1:323513679490:web:45a88e892fa3ada7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
