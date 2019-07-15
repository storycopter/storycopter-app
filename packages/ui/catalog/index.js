import { Catalog } from '@catalog/core';
import React from 'react';
import ReactDOM from 'react-dom';

// import pages from './pages';
// import theme from './theme';

import { version } from '../package.json';

import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <>
    <CssBaseline />
    <Catalog
      pages={[
        {
          title: 'README',
          component: require('../README.md'),
          path: '/',
        },
        {
          title: 'Welcome',
          component: require('./WELCOME.md'),
          path: '/welcome',
        },
        // ...pages,
      ]}
      // theme={theme}
      title={`Storycopter UI v.${version}`}
    />
  </>,
  document.getElementById('catalog')
);
