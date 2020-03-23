import { createSlice } from '@reduxjs/toolkit';

// so @pio can work with some real data as if from an opened project
import appendixJSON from '@storycopter/idoc/src/pages/005-appendix.json';
import beginningJSON from '@storycopter/idoc/src/pages/001-beginning.json';
import contentsJSON from '@storycopter/idoc/src/essentials/contents.json';
import creditsJSON from '@storycopter/idoc/src/essentials/credits.json';
import endJSON from '@storycopter/idoc/src/pages/003-end.json';
import errorJSON from '@storycopter/idoc/src/essentials/error.json';
import homeJSON from '@storycopter/idoc/src/essentials/home.json';
import introJSON from '@storycopter/idoc/src/pages/000-intro.json';
import middleJSON from '@storycopter/idoc/src/pages/002-middle.json';
import outroJSON from '@storycopter/idoc/src/pages/004-outro.json';
import siteJSON from '@storycopter/idoc/src/site/site.json';

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
    elementInspector: {},
    pageInspector: {},
  },
  // currentProject: {
  //   basepath: 'file:///Users/pio/Playground/storycopter/packages/idoc/',
  //   site: siteJSON,
  //   essentials: {
  //     contents: contentsJSON,
  //     credits: creditsJSON,
  //     error: errorJSON,
  //     home: homeJSON,
  //   },
  //   pages: [introJSON, beginningJSON, middleJSON, endJSON, outroJSON, appendixJSON],
  // },
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
