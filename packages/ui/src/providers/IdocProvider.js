import { array, bool, node, object, oneOfType, string } from 'prop-types';
import React from 'react';

import { defaultThm, negativeThm } from '../themes';
import { ThemeProvider } from '@material-ui/styles';

const CustomThemeProvider = ({ children, invert }) => {
  return <ThemeProvider theme={invert ? negativeThm : defaultThm}>{children}</ThemeProvider>;
};

CustomThemeProvider.propTypes = {
  children: oneOfType([array, node, object, string]),
  invert: bool,
};

CustomThemeProvider.defaultProps = {
  children: null,
  invert: null,
};

export default CustomThemeProvider;
