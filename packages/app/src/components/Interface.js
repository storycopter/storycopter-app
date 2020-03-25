import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import appTheme from '@storycopter/ui/src/themes/appTheme';

import Canvas from './Canvas';
import Pages from './Pages';
import Inspector from './Inspector';

const useStyles = makeStyles(theme => ({
  editor: {
    flexGrow: 1,
    flexBasis: '100%',
    overflow: 'hidden',
  },
  side: {
    flexBasis: '310px',
    flexGrow: 0,
    height: '100%',
    overflowY: 'auto',
  },
}));

export default function Editor({ hasProject, onProjectOpen }) {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Grid
        alignContent="stretch"
        alignItems="stretch"
        style={{ height: '100vh' }}
        container
        direction="column"
        wrap="nowrap">
        <Grid item>
          <AppBar>
            <Toolbar>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                  <Box display="flex" justifyContent="flex-start">
                    <Button variant="contained" color="primary" onClick={onProjectOpen}>
                      Open Project
                    </Button>
                  </Box>
                </Grid>
                <Grid item>{hasProject ? <Pages /> : null}</Grid>
                <Grid item>
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
          <Toolbar />
        </Grid>
        {hasProject ? (
          <Grid container className={classes.editor} wrap="nowrap">
            <Grid item className={classes.side} style={{ overflowY: 'auto' }} xs>
              <Box borderRight={`1px solid ${appTheme.palette.divider}`} minHeight="100%">
                <Inspector />
              </Box>
            </Grid>
            <Grid item className={classes.main} style={{ overflowY: 'auto' }} xs>
              <Canvas />
            </Grid>
          </Grid>
        ) : (
          'Open a project…'
        )}
      </Grid>
    </>
  );
}
