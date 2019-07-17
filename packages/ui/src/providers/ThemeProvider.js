import { array, node, oneOfType, object, string } from 'prop-types';
import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';

const mui = createMuiTheme();

const theme = createMuiTheme({
  // Overrides
  overrides: {},

  // Props
  props: {},

  // Palette
  palette: {},

  // Shape
  shape: {},

  // Typography
  typography: {},
});

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

CustomThemeProvider.propTypes = {
  children: oneOfType([array, node, object, string]).isRequired,
};

export default CustomThemeProvider;
