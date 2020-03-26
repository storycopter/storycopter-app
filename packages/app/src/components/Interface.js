import React from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';

import appTheme from '@storycopter/ui/src/themes/appTheme';

import Canvas from './Canvas/Canvas';
import Inspector from './Inspector/Inspector';
import Topbar from './Topbar/Topbar';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  launchpad: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
  },
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

export default function Editor({ ...props }) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Grid
        alignContent="stretch"
        alignItems="stretch"
        className={classes.root}
        container
        direction="column"
        justifyContent={props.hasProject ? 'flexStart' : 'center'}
        wrap="nowrap">
        <Grid item className={classes.topbar}>
          <Topbar {...props} />
        </Grid>
        {props.hasProject ? (
          <Grid container item className={classes.editor} wrap="nowrap">
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
          <Grid item className={classes.launchpad}>
            <List>
              <ListItem button onClick={props.onProjectOpen}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Open project…" />
              </ListItem>
            </List>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
