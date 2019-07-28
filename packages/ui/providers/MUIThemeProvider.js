import React from 'react';
import { ThemeProvider } from 'styled-components';

const MUIThemeProvider = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

export default MUIThemeProvider;
