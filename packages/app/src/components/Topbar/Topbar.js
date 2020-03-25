import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Pages from './Pages';

const useStyles = makeStyles(theme => ({}));

const Topbar = ({ data, update, ...props }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" justifyContent="flex-start">
                <Button variant="contained" onClick={props.onProjectOpen}>
                  Open Project
                </Button>
              </Box>
            </Grid>
            <Grid item>{props.hasProject ? <Pages /> : null}</Grid>
            <Grid item>
              <Box display="flex" justifyContent="flex-end">
                <IconButton>
                  <LaunchIcon />
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
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(Topbar);
