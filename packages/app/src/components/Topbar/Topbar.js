import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Pages from './Pages';

const useStyles = makeStyles(theme => ({}));

const Topbar = ({ data, update, ...props }) => {
  const classes = useStyles();

  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  return (
    <>
      <AppBar>
        <Toolbar>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" justifyContent="flex-start">
                <Button {...bindTrigger(popupState)}>Menu</Button>
                <Menu
                  {...bindMenu(popupState)}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                  <MenuItem
                    dense
                    onClick={() => {
                      popupState.close();
                      props.onProjectOpen();
                    }}>
                    Open project…
                  </MenuItem>
                  <MenuItem
                    dense
                    onClick={() => {
                      popupState.close();
                      props.onSaveChanges();
                    }}>
                    Save changes
                  </MenuItem>
                </Menu>
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
