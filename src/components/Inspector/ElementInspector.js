import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '@reducers/data';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import AdvancedControls from './ofElementInspector/AdvancedControls';
import DecorControls from './ofElementInspector/DecorControls';
import LayoutControls from './ofElementInspector/LayoutControls';
import SlicesControls from './ofElementInspector/SlicesControls';

import formulas from '@formulas/map';

const useStyles = makeStyles(theme => ({
  // panelSummary: {
  //   cursor: 'default !important',
  // },
  expandIcon: {
    marginRight: `${theme.spacing(1)}px`,
    marginLeft: `${theme.spacing(1)}px`,
  },
  layoutControls: {},
  decorControls: {
    marginTop: theme.spacing(1),
  },
  advancedControls: {
    marginTop: theme.spacing(1),
  },
}));

const ElementInspector = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { inspector, currentProject } = data;
  const { pages, essentials } = currentProject;
  const { elementInspector } = inspector;

  const { activePageId, activeElementId } = data.editor;

  if (!activePageId || !activeElementId) return <>Select an element</>;

  const isEssential = ['home', 'credits'].includes(activePageId);
  const activePage = isEssential ? essentials[activePageId] : _.find(pages, o => o.meta.uid === activePageId);
  const activeElement = _.find(activePage.elements, o => o.id === activeElementId);
  const { type } = activeElement;

  const togglePanel = payload => {
    update({
      ...produce(data, nextData => {
        nextData.inspector.elementInspector[payload] = !data.inspector.elementInspector[payload];
      }),
    });
  };

  console.group('ElementInspector.js');
  // console.log('activeElement:', activeElementId);
  // console.log('activePageId:', activePageId);
  console.log('activePage:', activePage);
  console.log('activeElement:', activeElement);
  console.groupEnd();

  const expansionPanelProps = {
    square: true,
    elevation: 0,
  };

  return (
    <form noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
      <ExpansionPanel
        expanded={elementInspector.details}
        onChange={() => togglePanel('details')}
        {...expansionPanelProps}>
        <ExpansionPanelSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                control={
                  elementInspector.details ? (
                    <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                  )
                }
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
          <LayoutControls className={classes.layoutControls} />
          <DecorControls className={classes.decorControls} />
          <AdvancedControls className={classes.advancedControls} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {!isEssential && formulas[type]?.settings.slices ? (
        <ExpansionPanel
          expanded={elementInspector.slices}
          onChange={() => togglePanel('slices')}
          {...expansionPanelProps}>
          <ExpansionPanelSummary aria-controls="panel2bh-content" id="panel2bh-header">
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <FormControlLabel
                  aria-label="Expand"
                  control={
                    elementInspector.slices ? (
                      <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                    ) : (
                      <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                    )
                  }
                  label={
                    <Typography noWrap variant="subtitle2">
                      Children
                    </Typography>
                  }></FormControlLabel>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
            <SlicesControls className={classes.slicesControls} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ) : null}
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(ElementInspector);
