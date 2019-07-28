import React from 'react';
import { ThemeProvider } from 'styled-components';

import { defaultThm } from '@storycopter/ui/themes';

const SCThemeProvider = ({ children }) => (
  <ThemeProvider theme={defaultThm}>{children}</ThemeProvider>
);

export default SCThemeProvider;
