import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
}));

const LayoutControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { essentials, pages } = data.currentProject;
  const { activePageId, activeElementId } = data.editor;

  const isEssential = ['credits', 'home'].includes(activePageId);

  const activePage = isEssential ? essentials[activePageId] : _.find(pages, o => o.meta.uid === activePageId);
  const activePageIndex = !isEssential ? _.findIndex(pages, o => o.meta.uid === activePageId) : null;
  const activeElementIndex = _.findIndex(activePage.elements, o => o.id === activeElementId);
  const activeElement = isEssential
    ? activePage.elements[activeElementIndex]
    : pages[activePageIndex].elements[activeElementIndex];
  const { settings } = activeElement;

  const onElementUpdate = payload => {
    if (isEssential) {
      update({
        ...produce(data, nextData => {
          nextData.currentProject.essentials[activePageId].elements[activeElementIndex].settings = {
            ...nextData.currentProject.essentials[activePageId].elements[activeElementIndex].settings,
            ...payload,
          };
        }),
      });
    } else {
      update({
        ...produce(data, nextData => {
          nextData.currentProject.pages[activePageIndex].elements[activeElementIndex].settings = {
            ...nextData.currentProject.pages[activePageIndex].elements[activeElementIndex].settings,
            ...payload,
          };
        }),
      });
    }
    return null;
  };

  // console.group('LayoutControls.js');
  // console.log('activeElement:', activeElement);
  // console.groupEnd();

  return (
    <div {...props}>
      <Grid container alignContent="center" spacing={2}>
        <Grid item>
          <Tooltip title="Align content">
            <ToggleButtonGroup
              aria-label="Align content"
              exclusive
              onChange={(e, v) => onElementUpdate({ align: v || 'left' })}
              size="small"
              value={settings.align}
              className={classes.toggleButtonGroup}
              //  variant="outlined" fullWidth aria-label="Align items" size="large"
            >
              <ToggleButton disableRipple value="left">
                <AlignLeftIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton disableRipple value="center">
                <AlignCenterHorizontalIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton disableRipple value="right">
                <AlignRightIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Tooltip>
        </Grid>
        {!isEssential ? (
          <Grid item>
            <Tooltip title="Make element fit browser window">
              <ToggleButton
                size="small"
                value="check"
                selected={settings.fullSize}
                onChange={() => onElementUpdate({ fullSize: !settings.fullSize })}>
                <FullscreenIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(LayoutControls);
