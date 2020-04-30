import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '@reducers/data';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { colors } from '@storycopter/idoc';

import deletePage from '../../../utils/deletePage';
import duplicatePage from '../../../utils/duplicatePage';
import uploadFile from '../../../utils/uploadFile';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardMedia: {
    background: `radial-gradient(${colors.flare[100]}, ${colors.shadow[100]}, ${colors.shadow[200]})`,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardLabel: {
    display: 'block',
    margin: '0 !important',
    width: '100%',
  },
  dialogTitle: {
    marginRight: theme.spacing(4),
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

const MetaControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { basepath, pages, essentials } = data.currentProject;
  const { activePageId } = data.editor;

  const isEssential = ['home', 'credits'].includes(activePageId);
  const targetEntity = isEssential ? 'essentials' : 'pages';

  const activePage = isEssential ? essentials[activePageId] : _.find(pages, o => o.meta.uid === activePageId);
  const activePageIndex = isEssential ? null : _.findIndex(pages, o => o.meta.uid === activePageId);

  const [coverImage, setCoverImage] = useState(activePage?.meta.coverImage);
  const [summary, setSummary] = useState(activePage?.meta.summary);
  const [title, setTitle] = useState(activePage?.meta.title);
  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const popupState = usePopupState({ variant: 'popover', popupId: 'advancedPageMenu' });

  const onMetaUpdate = payload => {
    update({
      ...produce(data, nextData => {
        if (isEssential) {
          nextData.currentProject.essentials[activePageId].meta = {
            ...nextData.currentProject.essentials[activePageId].meta,
            ...payload,
          };
        } else {
          nextData.currentProject.pages[activePageIndex].meta = {
            ...nextData.currentProject.pages[activePageIndex].meta,
            ...payload,
          };
        }
      }),
    });
  };

  const onTitleChange = e => {
    if (isEssential) return;
    if (e.target.value.length === 0) return;
    if (e.target.value === activePage.meta.title) return;
    const newPage = duplicatePage(basepath, activePage?.meta.uid, e.target.value);
    const oldPageUID = activePage.meta.uid;
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex] = newPage;
        nextData.editor.activePageId = newPage.meta.uid;
      }),
    });
    deletePage(basepath, oldPageUID);
  };

  const onAddCover = () => {
    const destination = `src/${targetEntity}/${activePageId}/`;
    const file = uploadFile(basepath, destination, ['jpg', 'png']);
    if (file) {
      onMetaUpdate({
        coverImage: {
          name: file.name,
        },
      });
      setCoverImage(file);
    }
  };

  const onPageDelete = () => {
    update({
      ...produce(data, nextData => {
        nextData.editor.activePageId = null;
        nextData.editor.activeElementId = null;
        nextData.currentProject.pages = [
          ...nextData.currentProject.pages.image(0, activePageIndex),
          ...nextData.currentProject.pages.image(activePageIndex + 1),
        ];
      }),
    });
    setDeleteDialogState(false);
    deletePage(basepath, activePageId);
  };

  useEffect(() => {
    setCoverImage(activePage?.meta.coverImage);
    setSummary(activePage?.meta.summary);
    setTitle(activePage?.meta.title);
  }, [activePage]);

  const textFieldProps = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
    },
    margin: 'dense',
    type: 'text',
    variant: 'filled',
  };

  // console.group('MetaControls.js');
  // console.log('activePageId', activePageId);
  // console.log('activePage', activePage);
  // console.groupEnd();

  return (
    <>
      <div {...props} style={{ width: '100%' }}>
        <TextField
          {...textFieldProps}
          autoFocus={!title || title.length === 0}
          disabled={isEssential}
          inputProps={{ onBlur: onTitleChange }}
          label="Page title"
          onChange={e => setTitle(e.target.value)}
          value={title || ''}
        />
        {!isEssential ? (
          <TextField
            {...textFieldProps}
            disabled={isEssential}
            inputProps={{ onBlur: e => onMetaUpdate({ summary: e.target.value }) }}
            label="Page summary"
            multiline
            onChange={e => setSummary(e.target.value)}
            rowsMax={4}
            value={summary || ''}
          />
        ) : null}

        {!isEssential ? (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={activePage?.meta.coverEnabled}
                  color="primary"
                  id="coverEnabled"
                  name="coverEnabled"
                  onChange={e => onMetaUpdate({ coverEnabled: e.target.checked })}
                />
              }
              label={<Typography variant="overline">Enable page cover</Typography>}
            />
            <FormControl variant="filled" fullWidth margin="dense">
              <Card elevation={0}>
                <CardMedia className={classes.cardMedia}>
                  <Box height="80px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    {coverImage?.name ? (
                      <img
                        alt="Cover"
                        height="60"
                        src={`file:///${basepath}/src/${targetEntity}/${activePageId}/${coverImage.name}`}
                        title="Cover"
                      />
                    ) : (
                      <PanoramaOutlinedIcon color={activePage?.meta.coverEnabled ? 'action' : 'disabled'} />
                    )}
                  </Box>
                </CardMedia>
                <CardActions>
                  <Button
                    color="primary"
                    disabled={!activePage?.meta.coverEnabled}
                    fullWidth
                    onClick={onAddCover}
                    size="small">
                    Choose file…
                  </Button>
                </CardActions>
              </Card>
            </FormControl>
          </>
        ) : null}
        {!isEssential ? (
          <FormControl variant="filled" fullWidth margin="dense">
            <Button {...bindTrigger(popupState)} color="primary" fullWidth size="small" startIcon={<SettingsIcon />}>
              Advanced…
            </Button>
            <Menu
              {...bindMenu(popupState)}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <MenuItem
                dense
                disabled={pages.length <= 1}
                onClick={() => {
                  popupState.close();
                  setDeleteDialogState(true);
                }}>
                Delete page…
              </MenuItem>
            </Menu>
          </FormControl>
        ) : null}
      </div>
      <Dialog
        aria-labelledby="delete-page-title"
        maxWidth="xs"
        onClose={() => setDeleteDialogState(false)}
        open={deleteDialogState}>
        <MuiDialogTitle id="delete-page-title" disableTypography className={classes.dialogTitle}>
          <Typography variant="h6">Do you want to delete page: {title}?</Typography>
          <IconButton
            aria-label="close"
            className={classes.dialogCloseButton}
            onClick={() => setDeleteDialogState(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent>
          <DialogContentText>This can not be undone.</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={() => setDeleteDialogState(false)} color="primary">
            Cancel
          </Button>
          <Button autoFocus color="primary" onClick={onPageDelete} variant="contained">
            Delete page
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(MetaControls);
