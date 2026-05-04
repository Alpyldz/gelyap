const firebaseConfig = {
  apiKey: "AIzaSyDmBN9qHwzdJq3aO7i1LPwBy1KfdCyqnro",
  authDomain: "gelyappp-c98b6.firebaseapp.com",
  projectId: "gelyappp-c98b6",
  storageBucket: "gelyappp-c98b6.appspot.com",
  messagingSenderId: "577050790080",
  appId: "1:577050790080:web:062543af268134418425"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();