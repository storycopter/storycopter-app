import { createSlice } from '@reduxjs/toolkit';

// so @pio can work with some real data as if from an opened project
import siteJSON from '@storycopter/idoc/src/site/site.json';
import contentsJSON from '@storycopter/idoc/src/essentials/contents.json';
import creditsJSON from '@storycopter/idoc/src/essentials/credits.json';
import errorJSON from '@storycopter/idoc/src/essentials/error.json';
import homeJSON from '@storycopter/idoc/src/essentials/home.json';
// import introJSON from '@storycopter/idoc/src/chapters/000-intro.json';
import beginningJSON from '@storycopter/idoc/src/chapters/001-beginning.json';

const initialState = {
  editor: {
    activeChapter: null,
  },
  inspector: {
    activeInspector: 'document',
    documentInspector: {
      meta: true,
      brand: false,
      sound: false,
      motivation: false,
    },
    chapterInspector: {},
    elementInspector: {},
  },
  currentProject: {
    basepath: 'file:///Users/pio/Playground/storycopter/packages/idoc/',
    site: siteJSON,
    essentials: {
      contents: contentsJSON,
      credits: creditsJSON,
      error: errorJSON,
      home: homeJSON,
    },
    chapters: [beginningJSON],
    // chapters: [introJSON, beginningJSON],
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
