import { array, bool, node, object, oneOfType, string } from 'prop-types';
import React from 'react';

import { defaultThm, negativeThm } from '@storycopter/ui/themes';
import { ThemeProvider } from '@material-ui/styles';

const CustomThemeProvider = ({ children, invert }) => {
  // console.group('CustomThemeProvider');
  // console.log({ invert });
  // console.groupEnd();
  return (
    <ThemeProvider theme={invert ? negativeThm : defaultThm}>
      {children}
    </ThemeProvider>
  );
};

CustomThemeProvider.propTypes = {
  children: oneOfType([array, node, object, string]).isRequired,
  invert: bool,
};

CustomThemeProvider.defaultProps = {
  invert: null,
};

export default CustomThemeProvider;
