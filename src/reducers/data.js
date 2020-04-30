import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editor: {
    activePageId: null,
    activeElementId: null,
  },
  inspector: {
    activeInspector: 'document',
    documentInspector: {
      meta: true,
      brand: false,
      sound: false,
      motivation: false,
    },
    elementInspector: {
      details: true,
      slices: true,
    },
    pageInspector: {
      meta: true,
      tree: true,
    },
  },
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
