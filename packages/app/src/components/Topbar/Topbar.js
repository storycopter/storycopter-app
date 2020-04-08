import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Pages from './Pages';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    // margin: 0,
    marginRight: theme.spacing(3),
    padding: theme.spacing(3),
  },
  dialogCloseButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  dialogActions: {
    padding: theme.spacing(3),
  },
}));

const Topbar = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject } = data;

  const [closeDialogState, setCloseDialogState] = React.useState(false);
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  const onProjectCloseWSave = () => {
    setCloseDialogState(false);
    popupState.close();
    props.onSaveChanges();
    localStorage.clear();
    update({
      ...produce(data, nextData => {
        nextData.currentProject = null;
        nextData.editor.activeElementId = null;
        nextData.editor.activePageId = null;
      }),
    });
  };

  const onProjectCloseWOSave = () => {
    setCloseDialogState(false);
    localStorage.clear();
    update({
      ...produce(data, nextData => {
        nextData.currentProject = null;
        nextData.editor.activeElementId = null;
        nextData.editor.activePageId = null;
      }),
    });
  };

  const onProjectClose = () => {
    popupState.close();
    setCloseDialogState(true);
  };

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
                      props.onProjectCreate();
                    }}>
                    New story…
                  </MenuItem>
                  <MenuItem
                    dense
                    divider
                    onClick={() => {
                      popupState.close();
                      props.onProjectOpen();
                    }}>
                    Open story…
                  </MenuItem>
                  <MenuItem
                    dense
                    disabled={!currentProject?.basepath}
                    onClick={() => {
                      popupState.close();
                      props.onSaveChanges();
                    }}>
                    Save changes
                  </MenuItem>
                  <MenuItem dense disabled={!currentProject?.basepath} divider onClick={onProjectClose}>
                    Close story
                  </MenuItem>
                  <MenuItem dense onClick={props.onAppClose}>
                    Quit Storycopter
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
      <Dialog
        aria-labelledby="close-dialog-title"
        maxWidth="xs"
        onClose={() => setCloseDialogState(false)}
        open={closeDialogState}>
        <MuiDialogTitle id="close-dialog-title" disableTypography className={classes.dialogTitle}>
          <Typography variant="h6">Do you want to save the changes you made to the story?</Typography>
          <IconButton
            aria-label="close"
            className={classes.dialogCloseButton}
            onClick={() => setCloseDialogState(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent>
          <DialogContentText>Your changes will be lost if you don't save them.</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onProjectCloseWOSave} color="primary">
            Discard & close
          </Button>
          <Button autoFocus onClick={onProjectCloseWSave} variant="contained" color="primary">
            Save & close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(Topbar);
