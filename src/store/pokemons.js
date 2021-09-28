import { createSlice } from '@reduxjs/toolkit';
import FirebaseClass from '../service/firebase';

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
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
    selectedPokemons: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    cleanPokemons: (state) => ({
      ...state,
      data: {},
    }),
  },
});

export const {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
  selectedPokemons,
  cleanPokemons,
} = slice.actions;
export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
export const selectPokemonsData = (state) => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons());
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data));
};
export default slice.reducer;

// 	handleSelectedPokemons: (state, {payload: {key, pokemon}}) => {
// 		const newPokemons = {...state.selectedPokemons};
//     if (newPokemons[key]) {
//       delete newPokemons[key];
//       return { ...state, selectedPokemons: newPokemons};
//     }
// 		if (Object.entries(state.selectedPokemons).length<5) {
// 				newPokemons[key]=pokemon;
// 			return{...state, selectedPokemons: newPokemons};
// 		}
//   }
// }
