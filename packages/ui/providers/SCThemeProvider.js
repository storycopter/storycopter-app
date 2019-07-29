import React from 'react';
import { ThemeProvider } from 'styled-components';

import { defaultThm, negativeThm } from '@storycopter/ui/themes';

const SCThemeProvider = ({ children, invert }) => (
  <ThemeProvider theme={invert ? negativeThm : defaultThm}>
    {children}
  </ThemeProvider>
);

export default SCThemeProvider;
