import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { SCThemeProvider } from '@storycopter/ui/providers';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <SCThemeProvider>
        <main>{children}</main>
      </SCThemeProvider>
    </>
  );
};

export default Layout;
