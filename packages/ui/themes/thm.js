import { color } from '@storycopter/ui/settings';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

let thm = createMuiTheme();

thm.overrides = {
  MuiTooltip: {
    tooltip: {
      backgroundColor: color.mono900,
      fontSize: thm.typography.pxToRem(13),
      fontWeight: thm.typography.fontWeightRegular,
    },
  },
  MuiIconButton: {
    root: {
      padding: 6,
    },
  },
};

thm.palette = {
  ...thm.palette,
  common: {
    black: color.mono900,
    white: '#fff',
  },
};
thm.props = {
  ...thm.props,
  MuiButtonBase: {
    // disableRipple: true,
  },
};

thm.shape = {
  ...thm.shape,
  borderRadius: 2,
};

export default thm;
