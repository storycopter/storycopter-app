import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import { Checkbox, FormControl, FormControlLabel, FilledInput, InputLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const Motivation = props => {
  const classes = useStyles();

  const { data, update } = props;
  const { currentProject } = data;

  const handleChange = e => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...currentProject.site,
          motivation: {
            ...currentProject.site.motivation,
            [e.target.name]: e.target.value,
          },
        },
      },
    });
  };

  const handleCheckbox = e => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...currentProject.site,
          motivation: {
            ...currentProject.site.motivation,
            [e.target.name]: e.target.checked,
          },
        },
      },
    });
  };

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <Typography variant="body2" gutterBottom>
        Your call to action will become part of the main navigation. It will open destination link in the same browser
        tab.
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={currentProject.site.motivation.enable}
            color="primary"
            id="enable"
            name="enable"
            onChange={handleCheckbox}
            value="true"
          />
        }
        label={<Typography variant="overline">Motivate readers</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="label">Action label</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="label"
          name="label"
          onChange={handleChange}
          type="text"
          value={currentProject.site.motivation.label}
          disabled={!currentProject.site.motivation.enable}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="link">Action link</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="link"
          name="link"
          onChange={handleChange}
          type="url"
          value={currentProject.site.motivation.link}
          disabled={!currentProject.site.motivation.enable}
        />
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(Motivation);
