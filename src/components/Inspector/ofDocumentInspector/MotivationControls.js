import React, { useState } from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import makeStyles from '@material-ui/core/styles/makeStyles';

// const useStyles = makeStyles(theme => ({}));

const MotivationControls = ({ data, update, ...props }) => {
  // const classes = useStyles();

  const { currentProject } = data;
  const { site } = currentProject;
  const { motivation } = site;

  const [enabled, setEnabled] = useState(motivation.enabled);
  const [link, setLink] = useState(motivation.link);
  const [label, setLabel] = useState(motivation.label);

  const onMotivationUpdate = payload => {
    update({
      ...produce(data, nextData => {
        nextData.currentProject.site.motivation = {
          ...nextData.currentProject.site.motivation,
          ...payload,
        };
      }),
    });
  };

  const textFieldProps = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
    },
    margin: 'dense',
    type: 'text',
    variant: 'filled',
  };

  return (
    <div {...props}>
      <Typography variant="body2" gutterBottom>
        Your call to action will become part of the main navigation. It will open destination link in the same browser
        tab.
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={enabled}
            color="primary"
            id="enabled"
            name="enabled"
            onChange={e => {
              setEnabled(e.target.checked);
              onMotivationUpdate({ enabled: e.target.checked });
            }}
          />
        }
        label={<Typography variant="overline">Motivate readers</Typography>}
      />
      <TextField
        {...textFieldProps}
        disabled={!enabled}
        inputProps={{ onBlur: e => onMotivationUpdate({ label: e.target.value }) }}
        label="Text label"
        onChange={e => setLabel(e.target.value)}
        value={label || ''}
      />
      <TextField
        {...textFieldProps}
        disabled={!enabled}
        inputProps={{ onBlur: e => onMotivationUpdate({ link: e.target.value }) }}
        label="Link address"
        onChange={e => setLink(e.target.value)}
        value={link || ''}
      />
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(MotivationControls);
