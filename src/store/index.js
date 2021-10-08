import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';
import chosenPokemonsReducer from './chosenPokemons';
import enemyReducer from './enemy';
import userReducer from './user';

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    chosenPokemons: chosenPokemonsReducer,
    enemy: enemyReducer,
    user: userReducer,
  },
});
