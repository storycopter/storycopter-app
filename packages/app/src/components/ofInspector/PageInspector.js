import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import MetaControls from './ofPageInspector/MetaControls';
import TreeControls from './ofPageInspector/TreeControls';

const useStyles = makeStyles(theme => ({
  expandIcon: {
    marginRight: `${theme.spacing(1)}px`,
    marginLeft: `${theme.spacing(1)}px`,
  },
}));

const PageInspector = ({ data, update }) => {
  const classes = useStyles();

  const { activePageId } = data.editor;
  const { pageInspector } = data.inspector;

  if (!activePageId) return <>Select a page</>;

  const onUpdatePageInspector = payload => {
    update({
      ...produce(data, nextData => {
        nextData.inspector.pageInspector = {
          ...nextData.inspector.pageInspector,
          ...payload,
        };
      }),
    });
  };

  return (
    <>
      <ExpansionPanel
        expanded={pageInspector.meta}
        onChange={() => onUpdatePageInspector({ meta: !pageInspector.meta })}
        square
        elevation={0}>
        <ExpansionPanelSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                onClick={() => onUpdatePageInspector({ meta: !pageInspector.meta })}
                control={
                  pageInspector.meta ? (
                    <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                  )
                }
                label={
                  <Typography noWrap variant="subtitle2">
                    Page details
                  </Typography>
                }></FormControlLabel>
            </Grid>
            <Grid item>
              <Tooltip title="The information you provide here will be used to populate your document’s main navigation as well as SEO meta tags of the current page.">
                <IconButton aria-label="More details…" size="small" onClick={e => e.stopPropagation()}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MetaControls />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={pageInspector.tree}
        onChange={() => onUpdatePageInspector({ tree: !pageInspector.tree })}
        square
        elevation={0}>
        <ExpansionPanelSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                onClick={() => onUpdatePageInspector({ tree: !pageInspector.tree })}
                control={
                  pageInspector.tree ? (
                    <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                  )
                }
                label={
                  <Typography noWrap variant="subtitle2">
                    Elements
                  </Typography>
                }></FormControlLabel>
            </Grid>
            <Grid item>
              <Tooltip title="The information you provide here will be used to populate your document’s main navigation as well as SEO tree tags of the current page.">
                <IconButton aria-label="More details…" size="small" onClick={e => e.stopPropagation()}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TreeControls />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(PageInspector);
