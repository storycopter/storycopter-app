import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from '@catalog/core';

import { GlobalStyles } from '@storycopter/ui/components';
import IdocProvider from '@storycopter/ui/providers/IdocProvider';

import pages from './pages';
// import theme from './theme';

import { version } from '../package.json';

ReactDOM.render(
  <IdocProvider>
    <GlobalStyles />
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
  </IdocProvider>,
  document.getElementById('catalog')
);
