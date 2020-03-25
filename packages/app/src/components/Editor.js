import React from 'react';
import { connect } from 'react-redux';
import { update } from '../reducers/data';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import appTheme from '@storycopter/ui/src/themes/appTheme';

import Canvas from './Canvas';
import Inspector from './Inspector';

const useStyles = makeStyles(theme => ({
  root: {
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

const Editor = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} wrap="nowrap">
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
