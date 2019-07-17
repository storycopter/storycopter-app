import { Catalog } from '@catalog/core';
import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

// import ThemeProvider from '@storycopter/idoc-starter/theme/ThemeProvider';

import pages from './pages';
// import theme from './theme';

import { version } from '../package.json';

ReactDOM.render(
  <>
    <CssBaseline />
    <Catalog
      pages={[
        {
          title: 'Welcome',
          component: require('../README.md'),
          path: '/',
        },
        ...pages
      ]}
      // theme={theme}
      title={`Storycopter UI v.${version}`}
    />
  </>,
  document.getElementById('catalog')
);
