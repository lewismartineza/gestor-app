import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD7fxSwauFWCF9qjzEKdVEeX77vXDinBZo',
  authDomain: 'oscloud-cc2e2.firebaseapp.com',
  databaseURL: 'https://oscloud-cc2e2.firebaseio.com',
  projectId: 'oscloud-cc2e2',
  storageBucket: 'oscloud-cc2e2.appspot.com',
  messagingSenderId: '279795316351',
  appId: '1:279795316351:web:110b2cc4c4e4d5240a714a',
  measurementId: 'G-BWPWND13X4',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
