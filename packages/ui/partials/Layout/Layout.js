import React from 'react';

import { IdocProvider } from '@storycopter/ui/providers';
import { GlobalStyles, Topbar } from '@storycopter/ui/partials';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <IdocProvider>
        <Topbar />
        <main>{children}</main>
      </IdocProvider>
    </>
  );
};

export default Layout;
