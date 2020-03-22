import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';
import { SketchPicker } from 'react-color';

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

  const { currentProject, editor } = data;
  const { basepath, chapters } = currentProject;
  const { activeChapterId, activeElementId } = editor;

  const activeChapter = activeChapterId ? _.find(chapters, o => o.meta.uid === activeChapterId) : null;
  const activeChapterIndex = activeChapterId ? _.findIndex(chapters, o => o.meta.uid === activeChapterId) : null;
  const activeComponentIndex = _.findIndex(activeChapter.tree.components, o => o.id === activeElementId);
  const activeComponent = chapters[activeChapterIndex].tree.components[activeComponentIndex];
  const { settings } = activeComponent;

  const [state, setState] = React.useState({
    color: settings.color ? settings.color : currentProject.site.brand.textColor,
    paint: settings.paint ? settings.paint : currentProject.site.brand.backgColor,
    mask: settings.mask ? settings.mask : currentProject.site.brand.brandColor,
  });

  const onElementUpdate = payload => {
    update({
      ...produce(data, nextData => {
        nextData.currentProject.chapters[activeChapterIndex].tree.components[activeComponentIndex].settings = {
          ...nextData.currentProject.chapters[activeChapterIndex].tree.components[activeComponentIndex].settings,
          ...payload,
        };
      }),
    });
  };

  const onInputBlur = e => {
    onElementUpdate({ [e.targe.name]: e.target.value });
  };

  const onInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    onElementUpdate({ [e.target.name]: e.target.value });
  };

  console.group('LayoutControls.js');
  console.log('activeComponent:', activeComponent);
  console.groupEnd();

  return (
    <div {...props}>
      <Grid container justify="space-between" alignContent="center" spacing={2}>
        <Grid item xs={true}>
          <ButtonGroup variant="outlined" fullWidth aria-label="Align items" size="large">
            <Tooltip title="Align left">
              <Button
                className={settings.align === 'left' ? classes.activeButton : null}
                disabled={false}
                onClick={() => onElementUpdate({ align: 'left' })}>
                <AlignLeftIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Align center">
              <Button
                className={settings.align === 'center' ? classes.activeButton : null}
                disabled={false}
                onClick={() => onElementUpdate({ align: 'center' })}>
                <AlignCenterHorizontalIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Align right">
              <Button
                className={settings.align === 'right' ? classes.activeButton : null}
                disabled={false}
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
