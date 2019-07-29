import { array, node, oneOfType, object, string } from 'prop-types';
import React from 'react';

import { defaultThm, negativeThm } from '@storycopter/ui/themes';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';

const mui = createMuiTheme();

const theme = createMuiTheme({
  ...mui,

  // Overrides
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: grey[900],
        fontSize: mui.typography.pxToRem(13),
        fontWeight: mui.typography.fontWeightRegular,
      },
    },
    MuiIconButton: {
      root: {
        padding: 6,
        '&:hover': {
          backgroundColor: 'transparent',
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
          '&$disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
      colorPrimary: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      colorSecondary: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },

  // Props
  props: {
    ...mui.props,
    MuiButtonBase: {
      disableRipple: true,
    },
  },

  // Palette
  palette: {
    ...mui.palette,
    common: {
      black: '#212121',
      white: '#fff',
    },
    primary: {
      light: '#ff6d01',
      main: '#ff6d01',
      dark: '#ff6d01',
      contrastText: '#fff',
    },
    secondary: {
      light: '#212121',
      main: '#212121',
      dark: '#212121',
      contrastText: '#fff',
    },
  },

  // Shape
  shape: {
    ...mui.shape,
    borderRadius: 2,
  },

  // Typography
  // typography: {},
});

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

CustomThemeProvider.propTypes = {
  children: oneOfType([array, node, object, string]).isRequired,
};

export default CustomThemeProvider;
