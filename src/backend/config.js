import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCEGU3o9yWZqtJUhMckw7OtJ1S3ZliNtSg",
    authDomain: "sando-recommendo.firebaseapp.com",
    databaseURL: "https://sando-recommendo-default-rtdb.firebaseio.com",
    projectId: "sando-recommendo",
    storageBucket: "sando-recommendo.appspot.com",
    messagingSenderId: "405684458024",
    appId: "1:405684458024:web:9e6aa9bb19a2485529db1d",
    measurementId: "G-HFL17E2CQ3"
};
  
const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

