import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { array, node, oneOfType, object, string } from "prop-types";
import React from "react";

import { color } from "@storycopter/styleguide/src/config";

const theme = createMuiTheme();

const customTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['"Lato"', '"Helvetica Neue"', "Arial", "sans-serif"].join(",")
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        fontWeight: 400,
        fontSize: theme.typography.pxToRem(18)
      },
      input: {
        padding: `${16 - 2}px 0 ${16 - 1}px`
      }
    },
    MuiInputLabel: {
      root: {
        fontWeight: 400
      }
    }
  },
  palette: {
    primary: {
      light: color.brand[500],
      main: color.brand[500],
      dark: color.brand[500]
    },
    secondary: {
      light: color.brand[500],
      main: color.brand[500],
      dark: color.brand[500]
    }
  }
});

const SiteThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={customTheme}>{children}</MuiThemeProvider>;
};

SiteThemeProvider.propTypes = {
  children: oneOfType([array, node, object, string]).isRequired
};

export default SiteThemeProvider;
