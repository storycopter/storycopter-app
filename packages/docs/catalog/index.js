import { Catalog } from '@catalog/core';
import React from 'react';
import ReactDOM from 'react-dom';

import { GlobalStyles } from '@storycopter/ui/partials';
import { SCThemeProvider } from '@storycopter/ui/providers';

import pages from './pages';
// import theme from './theme';

import { version } from '../package.json';

ReactDOM.render(
  <>
    <GlobalStyles />
    <SCThemeProvider>
      <Catalog
        pages={[
          {
            title: 'Welcome',
            component: require('../README.md'),
            path: '/',
          },
          ...pages,
        ]}
        // theme={theme}
        responsiveSizes={[
          { name: 'small', width: 360, height: 640 },
          { name: 'medium', width: 1024, height: 768 },
          { name: 'large', width: 1366, height: 768 },
        ]}
        title={`Storycopter UI v.${version}`}
      />
    </SCThemeProvider>
  </>,
  document.getElementById('catalog')
);
