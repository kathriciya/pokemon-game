import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import pokemonsReducer from './pokemons';
import chosenPokemonsReducer from './chosenPokemons';
import enemyReducer from './enemy';

export default configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
    chosenPokemons: chosenPokemonsReducer,
    enemy: enemyReducer,
  },
});
