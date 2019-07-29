import { array, node, oneOfType, object, string } from 'prop-types';
import React from 'react';

import { defaultThm, negativeThm } from '@storycopter/ui/themes';
import { ThemeProvider } from '@material-ui/styles';

const CustomThemeProvider = ({ children, invert }) => {
  return (
    <ThemeProvider theme={invert ? negativeThm : defaultThm}>
      {children}
    </ThemeProvider>
  );
};

CustomThemeProvider.propTypes = {
  children: oneOfType([array, node, object, string]).isRequired,
};

export default CustomThemeProvider;
