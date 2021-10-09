import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'game',
  initialState: {
    player1: {},
    player2: [],
    result: null,
  },
  reducers: {
    setPlayer1: (state, action) => ({
      ...state,
      player1: action.payload,
    }),
    setPlayer2: (state, action) => ({
      ...state,
      player2: action.payload,
    }),
    setResult: (state, action) => ({
      ...state,
      isLoading: false,
      result: action.payload,
    }),
  },
});

export const { setPlayer1, setPlayer2, setResult } = slice.actions;
export const selectPlayer1 = (state) => state.game.player1;
export const selectPlayer2 = (state) => state.game.player2;
export const selectResult = (state) => state.game.result;
export default slice.reducer;
