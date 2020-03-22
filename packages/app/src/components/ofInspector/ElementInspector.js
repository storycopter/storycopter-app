import React, { useState } from 'react';
import produce from 'immer';
import _ from 'lodash';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import LayoutControls from './ofElementInspector/LayoutControls';
import DecorControls from './ofElementInspector/DecorControls';

const useStyles = makeStyles(theme => ({
  panelSummary: {
    cursor: 'default !important',
  },
  panelhead: {
    cursor: 'default !important',
    paddingLeft: `${theme.spacing(1.5)}px`,
  },
  layoutControls: {},
  decorControls: {
    marginTop: theme.spacing(1),
  },
}));

const ElementInspector = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor, inspector } = data;
  const { elementInspector } = inspector;
  const { basepath, chapters } = currentProject;
  const { activeChapterId, activeElementId } = editor;

  const activeChapter = activeChapterId ? _.find(chapters, o => o.meta.uid === activeChapterId) : null;
  const activeChapterIndex = activeChapter ? _.findIndex(chapters, o => o.meta.uid === activeChapterId) : null;
  const activeElementIndex =
    activeChapterId && activeElementId
      ? _.findIndex(activeChapter.tree.components, o => o.id === activeElementId)
      : null;
  const activeElement = activeElementId ? activeChapter.tree.components[activeElementIndex] : null;

  const [state, setState] = React.useState({
    paint: activeElement ? activeElement.settings.paint : null,
  });

  if (!activeChapterId || !activeElementId) return <>Select an element</>;

  console.group('ElementInspector.js');
  console.log('activeElement:', activeElement);
  console.groupEnd();

  // color = null,
  // mask = null,
  // paint = null,

  // fill = null,

  // align = 'left',
  // cover = false,

  return (
    <>
      <ExpansionPanel expanded={true} square elevation={0}>
        <ExpansionPanelSummary aria-controls="panel1bh-content" id="panel1bh-header" className={classes.panelSummary}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                className={classes.panelhead}
                control={<></>}
                label={
                  <Typography noWrap variant="subtitle2">
                    Element properties
                  </Typography>
                }></FormControlLabel>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
          <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
            <LayoutControls className={classes.layoutControls} />
            <DecorControls className={classes.decorControls} />
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(ElementInspector);