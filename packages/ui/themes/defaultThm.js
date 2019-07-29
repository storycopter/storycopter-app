import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';

const mui = createMuiTheme();

const defaultThm = {
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
};

export default defaultThm;
