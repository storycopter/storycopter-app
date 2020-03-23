import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';

import AlignCenterHorizontalIcon from '@storycopter/ui/src/elements/Icons/AlignCenterHorizontalIcon';
import AlignLeftIcon from '@storycopter/ui/src/elements/Icons/AlignLeftIcon';
import AlignRightIcon from '@storycopter/ui/src/elements/Icons/AlignRightIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardMedia: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardLabel: {
    display: 'block',
    margin: '0 !important',
    width: '100%',
  },
  activeButton: {
    background: theme.palette.primary.light,
  },
}));

const LayoutControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { basepath, pages } = data.currentProject;
  const { activePageId, activeElementId } = data.editor;

  const activePage = activePageId ? _.find(pages, o => o.meta.uid === activePageId) : null;
  const activePageIndex = activePageId ? _.findIndex(pages, o => o.meta.uid === activePageId) : null;
  const activeComponentIndex = _.findIndex(activePage.tree.components, o => o.id === activeElementId);
  const activeComponent = pages[activePageIndex].tree.components[activeComponentIndex];
  const { settings } = activeComponent;

  const onElementUpdate = payload => {
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].tree.components[activeComponentIndex].settings = {
          ...nextData.currentProject.pages[activePageIndex].tree.components[activeComponentIndex].settings,
          ...payload,
        };
      }),
    });
  };

  // console.group('LayoutControls.js');
  // console.log('activeComponent:', activeComponent);
  // console.groupEnd();

  return (
    <div {...props}>
      <Grid container justify="space-between" alignContent="center" spacing={2}>
        <Grid item xs={true}>
          <ButtonGroup variant="outlined" fullWidth aria-label="Align items" size="large">
            <Tooltip title="Align left">
              <Button
                className={settings.align === 'left' ? classes.activeButton : null}
                onClick={() => onElementUpdate({ align: 'left' })}>
                <AlignLeftIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Align center">
              <Button
                className={settings.align === 'center' ? classes.activeButton : null}
                onClick={() => onElementUpdate({ align: 'center' })}>
                <AlignCenterHorizontalIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Align right">
              <Button
                className={settings.align === 'right' ? classes.activeButton : null}
                onClick={() => onElementUpdate({ align: 'right' })}>
                <AlignRightIcon fontSize="small" />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Button
            className={settings.cover ? classes.activeButton : null}
            onClick={() => onElementUpdate({ cover: !settings.cover })}
            size="large"
            variant="outlined">
            <FullscreenIcon fontSize="small" />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(LayoutControls);
