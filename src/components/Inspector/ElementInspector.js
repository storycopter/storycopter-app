import React from 'react';
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
import AdvancedControls from './ofElementInspector/AdvancedControls';

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
  advancedControls: {
    marginTop: theme.spacing(1),
  },
}));

const ElementInspector = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { activePageId, activeElementId } = data.editor;

  if (!activePageId || !activeElementId) return <>Select an element</>;

  // console.group('ElementInspector.js');
  // console.log('activeElement:', activeElement);
  // console.groupEnd();

  return (
    <form noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
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
          <LayoutControls className={classes.layoutControls} />
          <DecorControls className={classes.decorControls} />
          <AdvancedControls className={classes.advancedControls} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(ElementInspector);
