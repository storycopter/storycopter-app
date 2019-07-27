import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <main>{children}</main>
    </>
  );
};

export default Layout;
