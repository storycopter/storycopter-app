import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { update } from './reducers/data';

import CloseIcon from '@material-ui/icons/Close';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import LaunchIcon from '@material-ui/icons/Launch';
import GetAppIcon from '@material-ui/icons/GetApp';
import { AppBar, Box, Grid, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { defaultTheme } from './themes';

import { Chapters, Inspector } from './components';

const AppBarSpacer = styled(({ ...props }) => <div {...props} />)``;

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  main: {
    flexGrow: 1,
  },
  side: {
    flexBasis: '320px',
    flexGrow: 0,
  },
  offset: theme.mixins.toolbar,
}));

const Editor = props => {
  const classes = useStyles();
  return (
    <Grid
      alignContent="stretch"
      alignItems="stretch"
      className={classes.root}
      container
      direction="column"
      wrap="nowrap">
      <Grid item>
        <AppBar>
          <Toolbar>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item className={classes.side}>
                <Box display="flex" justifyContent="flex-start">
                  <IconButton>
                    <VerticalSplitIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item className={classes.main}>
                <Chapters />
              </Grid>
              <Grid item className={classes.side}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton>
                    <LaunchIcon />
                  </IconButton>
                  <IconButton>
                    <GetAppIcon />
                  </IconButton>
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBarSpacer className={classes.offset} />
      </Grid>
      <Grid container className={classes.main}>
        <Grid item className={classes.side}>
          <Box borderRight={`1px solid ${defaultTheme.palette.divider}`} minHeight="100%">
            Left
          </Box>
        </Grid>
        <Grid item className={classes.main}>
          Center
        </Grid>
        <Grid item className={classes.side}>
          <Box borderLeft={`1px solid ${defaultTheme.palette.divider}`} minHeight="100%">
            <Inspector />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(({ data }) => ({ data }), { update })(Editor);
