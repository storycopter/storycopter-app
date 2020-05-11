import { createMuiTheme } from '@material-ui/core/styles';

import { colors, setType } from '@storycopter/gatsby-starter-storycopter';

const mui = createMuiTheme();

// console.group('appTheme.js');
// console.log('mui:', mui);
// console.groupEnd();

export default createMuiTheme({
  colors: colors,

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      disableElevation: true,
    },
  },

  overrides: {
    // disable all animations
    // MuiCssBaseline: {
    //   '@global': {
    //     '*, *::before, *::after': {
    //       transition: 'none !important',
    //       animation: 'none !important',
    //     },
    //   },
    // },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: colors.mono[800],
      },
    },

    // Tabs

    MuiButton: {
      root: {
        minWidth: 'none',
      },
      outlined: {},
      outlinedPrimary: {},
      outlinedSecondary: {
        backgroundColor: colors.primary[500],
      },
      contained: {
        backgroundColor: colors.mono[700],
        color: colors.mono[200],
        '&:hover': {
          backgroundColor: colors.mono[600],
          color: colors.mono[100],
        },
      },
      containedPrimary: {
        backgroundColor: colors.secondary[500],
        color: colors.mono[100],
        '&:hover': {
          backgroundColor: colors.secondary[500],
          color: mui.palette.common.white,
        },
      },
      containedSecondary: {},
    },

    MuiTab: {
      root: {
        minWidth: 64,
        padding: '6px',
        [mui.breakpoints.up('sm')]: {
          padding: '6px',
        },
        [mui.breakpoints.up('sm')]: {
          minWidth: 64,
        },
      },
    },

    // Forms
    MuiFilledInput: {
      root: {
        borderBottomLeftRadius: mui.shape.borderRadius,
        borderBottomRightRadius: mui.shape.borderRadius,
      },
    },

    // Tooltips
    MuiTooltip: {
      tooltip: {
        ...setType(100),
        backgroundColor: colors.mono[800],
        color: colors.mono[100],
        fontWeight: 'normal',
        letterSpacing: '0',
      },
    },

    // Expansion Panels
    MuiExpansionPanel: {
      root: {
        background: mui.palette.background.default,
        '&:before': {
          top: 'auto',
          bottom: 1,
        },
        '&:first-child': {
          '&:before': {
            display: 'block',
          },
        },
        '&$expanded': {
          margin: '0 0',
          '&:before': {
            opacity: 1,
          },
        },
        '&$expanded + &': {
          '&:before': {
            display: 'block',
          },
        },
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: '0',
        marginLeft: `${mui.spacing(3)}px`,
        marginRight: `${mui.spacing(3)}px`,
        '&$expanded': {
          borderBottom: `1px solid ${mui.palette.divider}`,
          marginLeft: `${mui.spacing(3)}px`,
          marginRight: `${mui.spacing(3)}px`,
          minHeight: 8 * 6,
          padding: '0',
        },
        '&$focused': {
          backgroundColor: mui.palette.grey[300],
        },
      },
      content: {
        margin: '0 0',
        '&$expanded': {
          margin: '0 0',
        },
      },
    },

    MuiExpansionPanelDetails: {
      root: {
        padding: `${mui.spacing(2)}px ${mui.spacing(3)}px`,
      },
    },
  },
});
