import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme();

const defaultTheme = createMuiTheme({
  overrides: {
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
        padding: '0 0',
        margin: '0 24px',
        minHeight: 'auto',
        '&$expanded': {
          minHeight: 'auto',
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
        },
      },
      content: {
        '&$expanded': {
          margin: '16px 0',
        },
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '12px 24px 16px',
      },
    },
  },
});

export default defaultTheme;
