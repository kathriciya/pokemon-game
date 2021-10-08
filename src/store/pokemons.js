import { createSlice } from '@reduxjs/toolkit';
// import FirebaseClass from '../service/firebase';
import { selectLocalID } from './user';

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    win: null,
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    cleanPokemons: (state) => ({
      ...state,
      data: {},
    }),
    setWin: (state) => ({
      ...state,
      win: true,
    }),
  },
});

export const {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
  cleanPokemons,
  setWin,
} = slice.actions;
export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
export const selectPokemonsData = (state) => state.pokemons.data;
export const win = (state) => state.pokemons.win;

export const getPokemonsAsync = () => async (dispatch, getState) => {
  const localId = selectLocalID(getState());
  dispatch(fetchPokemons());
  const data = await fetch(
    `https://pokemon-game-58e6b-default-rtdb.firebaseio.com/${localId}/pokemons.json`
  ).then((res) => res.json());
  console.log('data: ', data);
  dispatch(fetchPokemonsResolve(data));
};

export default slice.reducer;
