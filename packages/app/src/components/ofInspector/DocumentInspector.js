import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../reducers/data';

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import BrandExperience from './ofDocumentInspector/BrandExperience';
import MetaInformation from './ofDocumentInspector/MetaInformation';
import Motivation from './ofDocumentInspector/Motivation';
import SoundExperience from './ofDocumentInspector/SoundExperience';

const useStyles = makeStyles(theme => ({
  expandIcon: {
    marginRight: '8px',
    marginLeft: '8px',
  },
}));

const DocumentInspector = props => {
  const classes = useStyles();
  const { data, update } = props;
  const { inspector } = data;
  const { documentInspector } = inspector;

  const togglePanel = panel => {
    console.log('Toggle panel: ', panel);
    console.log(data.inspector.documentInspector[panel]);

    update({
      inspector: {
        ...inspector,
        documentInspector: {
          ...documentInspector,
          [panel]: !documentInspector[panel],
        },
      },
    });
  };

  return (
    <>
      <ExpansionPanel expanded={documentInspector.meta} onChange={() => togglePanel('meta')} square elevation={0}>
        <ExpansionPanelSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                onClick={() => togglePanel('meta')}
                control={
                  documentInspector.meta ? (
                    <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                  )
                }
                label={
                  <Typography noWrap variant="subtitle2">
                    Meta information
                  </Typography>
                }></FormControlLabel>
            </Grid>
            <Grid item>
              <Tooltip title="The information you provide here will populate web metatags of your idoc. Such metatags are useful to display relevant info in search results and on social networks.">
                <IconButton aria-label="More details…" size="small" onClick={e => e.stopPropagation()}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MetaInformation />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={documentInspector.brand} onChange={() => togglePanel('brand')} square elevation={0}>
        <ExpansionPanelSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                onClick={() => togglePanel('brand')}
                control={
                  documentInspector.brand ? (
                    <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                  )
                }
                label={
                  <Typography noWrap variant="subtitle2">
                    Brand experience
                  </Typography>
                }></FormControlLabel>
            </Grid>
            <Grid item>
              <Tooltip title="Storycopter will make a series of aesthetic optimisations based on the following settings. Little customisation can make big impact.">
                <IconButton aria-label="More details…" size="small" onClick={e => e.stopPropagation()}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <BrandExperience />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={documentInspector.sound} onChange={() => togglePanel('sound')} square elevation={0}>
        <ExpansionPanelSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                onClick={() => togglePanel('sound')}
                control={
                  documentInspector.sound ? (
                    <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                  )
                }
                label={
                  <Typography noWrap variant="subtitle2">
                    Sound experience
                  </Typography>
                }></FormControlLabel>
            </Grid>
            <Grid item>
              <Tooltip title="Sound helps to set the atmosphere and can help reinforce your message. Use these settings to add background soundtrack for a more immersive reading experience.">
                <IconButton aria-label="More details…" size="small" onClick={e => e.stopPropagation()}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SoundExperience />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={documentInspector.motivation}
        onChange={() => togglePanel('motivation')}
        square
        elevation={0}>
        <ExpansionPanelSummary aria-controls="panel4bh-content" id="panel4bh-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                aria-label="Expand"
                onClick={() => togglePanel('motivation')}
                control={
                  documentInspector.motivation ? (
                    <ExpandLessIcon fontSize="small" className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
                  )
                }
                label={
                  <Typography noWrap variant="subtitle2">
                    Motivation
                  </Typography>
                }></FormControlLabel>
            </Grid>
            <Grid item>
              <Tooltip title="If your document is meant to encourage readers to take action, wether it’s signing a petition or visiting a website, you can specify that action here.">
                <IconButton aria-label="More details…" size="small" onClick={e => e.stopPropagation()}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Motivation />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default connect(({ data }) => ({ data }), { update })(DocumentInspector);
