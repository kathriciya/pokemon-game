import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyArTcid8f8BiJBVaBGKrStd1JZBJR_t_60',
  authDomain: 'pokemon-game-58e6b.firebaseapp.com',
  databaseURL: 'https://pokemon-game-58e6b-default-rtdb.firebaseio.com',
  projectId: 'pokemon-game-58e6b',
  storageBucket: 'pokemon-game-58e6b.appspot.com',
  messagingSenderId: '236284168747',
  appId: '1:236284168747:web:370e06a404aa356417386e',
};

firebase.initializeApp(firebaseConfig);
export const fire = firebase;
export const database = firebase.database();
export default database;
