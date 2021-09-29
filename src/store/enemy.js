import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'enemy',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    fetchEnemy: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchEnemyResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchEnemyReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    cleanEnemy: (state) => ({
      ...state,
      data: {},
    }),
  },
});

export const { fetchEnemy, fetchEnemyResolve, fetchEnemyReject, cleanEnemy } =
  slice.actions;
export const getEnemyAsync = (data) => async (dispatch) => {
  dispatch(fetchEnemy());
  dispatch(fetchEnemyResolve(data));
};
export const selectEnemyLoading = (state) => state.enemy.isLoading;
export const selectEnemyData = (state) => state.enemy.data;
export default slice.reducer;
