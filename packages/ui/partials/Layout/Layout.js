import React from 'react';

import { IdocProvider } from '@storycopter/ui/providers';
import { GlobalStyles, Topbar } from '@storycopter/ui/partials';

const Layout = ({ children, isHome, isCredits }) => {
  return (
    <>
      <IdocProvider>
        <GlobalStyles />
        <IdocProvider invert>
          <Topbar allowPrev={!isHome && !isCredits} allowNext={!isCredits} />
        </IdocProvider>
        <main>{children}</main>
      </IdocProvider>
    </>
  );
};

export default Layout;
