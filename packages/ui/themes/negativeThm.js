import { color } from '@storycopter/ui/settings';

import thm from './thm';

let negativeThm = thm;

negativeThm.palette = {
  ...thm.palette,
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
  background: {
    default: '#fafafa',
    paper: '#fff',
    accent: color.accent,
  },
  text: {
    primary: color.mono100,
    secondary: color.accent,
    disabled: color.mono500,
  },
};

negativeThm.overrides = {
  ...thm.overrides,
  MuiIconButton: {
    root: {
      color: color.flare700,
      '&:hover': {
        backgroundColor: color.shadow100,
        color: color.flare900,
      },
    },
  },
};

export default negativeThm;
