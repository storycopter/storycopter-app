import React from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListItemText from '@material-ui/core/ListItemText';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Canvas from './Canvas/Canvas';
import Inspector from './Inspector/Inspector';
import Topbar from './Topbar/Topbar';
import theme from './theme';

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
    overflowX: 'hidden',
  },
}));

export default function Interface({ ...props }) {
  const classes = useStyles();

  // console.group('Interface.js');
  // console.log({ theme });
  // console.groupEnd();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        alignContent="stretch"
        alignItems="stretch"
        className={classes.root}
        container
        direction="column"
        wrap="nowrap">
        <Grid item className={classes.topbar}>
          <Topbar {...props} />
        </Grid>
        {props.hasProject ? (
          <Grid container item className={classes.editor} wrap="nowrap">
            <Grid item className={classes.side} style={{ overflowY: 'auto' }} xs>
              <Box borderRight={`1px solid ${theme.palette.divider}`} minHeight="100%">
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
                <ListItemText primary="Open story…" />
              </ListItem>
              <ListItem button onClick={() => console.log()}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Create new story…" />
              </ListItem>
            </List>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
