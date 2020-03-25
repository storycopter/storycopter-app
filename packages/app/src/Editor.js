import React from 'react';
import { connect } from 'react-redux';
import { update } from './reducers/data';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import Toolbar from '@material-ui/core/Toolbar';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import makeStyles from '@material-ui/core/styles/makeStyles';

import appTheme from '@storycopter/ui/src/themes/appTheme';

import Canvas from './components/Canvas';
import Inspector from './components/Inspector';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  main: {
    flexGrow: 1,
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
  offset: theme.mixins.toolbar,
}));

const Editor = () => {
  const classes = useStyles();

  return (
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
  );
};

export default connect(({ data }) => ({ data }), { update })(Editor);
