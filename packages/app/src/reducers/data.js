import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foo: 'bar',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,

  reducers: {
    update: (state, { payload }) => ({ ...state, ...payload }),
    reset: () => initialState,
  },
});

const { actions, reducer } = dataSlice;
export const { update, reset } = actions;
export default reducer;
