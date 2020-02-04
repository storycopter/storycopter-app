import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import { Button, MenuItem, FormControl, FilledInput, InputLabel, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const SoundExperience = props => {
  const { data, update } = props;
  const { currentProject } = data;

  const classes = useStyles();

  const handleChange = e => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...currentProject.site,
          brand: {
            ...currentProject.site.brand,
            [e.target.name]: e.target.value,
          },
        },
      },
    });
  };

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <Typography variant="body2" gutterBottom>
        Background sound will autoplay and crossfade with any inline media that readers may interact with. It may be
        silenced at any time with document’s volume controls.
      </Typography>
      <FormControl variant="filled" fullWidth margin="dense">
        <input
          accept=".mp3,.m4a"
          color="primary"
          id="soundtrack"
          name="soundtrack"
          onChange={handleChange}
          style={{ display: 'none' }}
          type="file"
        />
        <label htmlFor="soundtrack">
          <Button startIcon={<AddIcon />} fullWidth variant="contained" component="span">
            Select soundtrack
          </Button>
        </label>
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(SoundExperience);
