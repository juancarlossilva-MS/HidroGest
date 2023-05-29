import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCSg522OTYKaccfC3bDLHe3hwY6joqzMik",
  authDomain: "hidrogest-e802d.firebaseapp.com",
  projectId: "hidrogest-e802d",
  storageBucket: "hidrogest-e802d.appspot.com",
  messagingSenderId: "1088070609390",
  appId: "1:1088070609390:web:a32a77c3a81d6e897346ff"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;