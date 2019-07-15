import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import 'fonts/iAWriterDuo.css';

const greyjoyThm = createMuiTheme({
  typography: {
    fontFamily: ['iAWriterDuo', 'sans-serif'].join(',')
  },
  overrides: {}
});

const GreyjoyThemeProvider = props => (
  <ThemeProvider {...props} theme={greyjoyThm} />
);

export default GreyjoyThemeProvider;
