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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    });
  };

  offPokemonSoket = () => {
    this.database.ref('pokemons').off();
  };

  getPokemonsOnce = async () => {
    return await this.database
      .ref('pokemons')
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (data, localId, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database
      .ref(localId + '/pokemons/' + newKey)
      .set(data)
      .then(() => cb && cb());
  };
}

const FirebaseClass = new Firebase();

export default FirebaseClass;
