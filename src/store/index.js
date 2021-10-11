import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';
import chosenPokemonsReducer from './chosenPokemons';
import enemyReducer from './enemy';
import userReducer from './user';
import gameReducer from './game';

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    chosenPokemons: chosenPokemonsReducer,
    enemy: enemyReducer,
    user: userReducer,
    game: gameReducer,
  },
});
