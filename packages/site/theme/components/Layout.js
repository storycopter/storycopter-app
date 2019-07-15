import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ThemeProvider from './ThemeProvider';


const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
});

const Layout = ({ children, classes }) => {
  return (
    <ThemeProvider>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default withStyles(styles)(Layout);
