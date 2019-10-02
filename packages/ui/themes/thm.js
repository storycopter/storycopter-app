import { color, radius } from '@storycopter/ui/settings';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

let thm = createMuiTheme();

thm.overrides = {
  MuiTooltip: {
    tooltip: {
      backgroundColor: color.mono100,
      color: color.mono800,
      fontSize: thm.typography.pxToRem(13),
      fontWeight: thm.typography.fontWeightRegular,
    },
  },
  MuiIconButton: {
    root: {
      backgroundColor: color.shadow200,
      borderRadius: radius.x,
      color: color.flare700,
      padding: 6,
      '&:hover': {
        backgroundColor: color.mono900,
        color: color.flare900,
      },
      '&$disabled': {
        backgroundColor: color.shadow200,
        color: color.flare300,
      },
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
    disableRipple: true,
  },
};

thm.shape = {
  ...thm.shape,
  borderRadius: radius.x,
};

export default thm;
