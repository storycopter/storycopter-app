import React from 'react';
import { ThemeProvider } from 'styled-components';

import { lightThm, darkThm } from '@storycopter/ui';

const MUIThemeProvider = ({ children }) => (
  <ThemeProvider theme={lightThm}>{children}</ThemeProvider>
);

export default MUIThemeProvider;
