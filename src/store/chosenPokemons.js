import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'chosenPokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    fetchChosenPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchChosenPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchChosenPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
  },
});

export const {
  fetchChosenPokemons,
  fetchChosenPokemonsResolve,
  fetchChosenPokemonsReject,
} = slice.actions;
export const selectChosenPokemonsLoading = (state) =>
  state.chosenPokemons.isLoading;
export const selectChosenPokemonsData = (state) => state.chosenPokemons.data;

export const getChosenPokemonsAsync = (data) => async (dispatch) => {
  dispatch(fetchChosenPokemons());
  dispatch(fetchChosenPokemonsResolve(data));
};

export default slice.reducer;
