import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme();

export default createMuiTheme({
  // transitions: {
  //   // So we have `transition: none;` everywhere
  //   create: () => 'none',
  // },
  props: {
    MuiButtonBase: {
      disableRipple: true,
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

    // Tabs
    MuiTab: {
      root: {
        minWidth: 64,
        padding: '6px',
        [muiTheme.breakpoints.up('sm')]: {
          padding: '6px',
        },
        [muiTheme.breakpoints.up('sm')]: {
          minWidth: 64,
        },
      },
    },

    // Forms
    MuiFilledInput: {
      root: {
        borderBottomLeftRadius: muiTheme.shape.borderRadius,
        borderBottomRightRadius: muiTheme.shape.borderRadius,
      },
    },

    // Tooltips
    MuiTooltip: {
      tooltip: {
        ...muiTheme.typography.body2,
      },
    },

    // Expansion Panels
    MuiExpansionPanel: {
      root: {
        background: muiTheme.palette.background.default,
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
        margin: `0 ${muiTheme.spacing(3)}px`,
        minHeight: 'auto',
        '&$expanded': {
          minHeight: 'auto',
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
        },
      },
      content: {
        '&$expanded': {
          margin: `${muiTheme.spacing(2)}px 0`,
        },
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: `${muiTheme.spacing(2)}px ${muiTheme.spacing(3)}px ${muiTheme.spacing(2)}px`,
      },
    },
  },
});
