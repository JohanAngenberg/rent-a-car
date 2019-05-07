import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDPb1VBtQKQ_ImKruwA84dQg6z6u2OOzg0",
    authDomain: "rentacar-a1427.firebaseapp.com",
    databaseURL: "https://rentacar-a1427.firebaseio.com",
    projectId: "rentacar-a1427",
    storageBucket: "rentacar-a1427.appspot.com",
    messagingSenderId: "1067160860378"
  };

firebase.initializeApp(config);

export default firebase;
