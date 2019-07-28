import React from 'react';

import { SCThemeProvider } from '@storycopter/ui/providers';
import { GlobalStyles } from '@storycopter/ui/partials';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <SCThemeProvider>
        <main>{children}</main>
      </SCThemeProvider>
    </>
  );
};

export default Layout;
