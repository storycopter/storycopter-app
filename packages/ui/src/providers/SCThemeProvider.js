import React from 'react';
import { ThemeProvider } from 'styled-components';

import { lightThm, darkThm } from '@storycopter/ui';

const SCThemeProvider = ({ children }) => (
  <ThemeProvider theme={lightThm}>{children}</ThemeProvider>
);

export default SCThemeProvider;
