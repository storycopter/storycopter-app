import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import { Button, FormControl, InputLabel, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const MetaInformation = props => {
  const { data, update } = props;
  const { currentProject } = data;

  const classes = useStyles();

  const handleChange = e => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...currentProject.site,
          meta: {
            ...currentProject.site.meta,
            [e.target.name]: e.target.value,
          },
        },
      },
    });
  };

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="title">Name</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="title"
          name="title"
          onChange={handleChange}
          required
          type="text"
          value={currentProject.site.meta.title}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="summary">Summary</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="summary"
          multiline={true}
          name="summary"
          onChange={handleChange}
          required
          type="text"
          rowsMax={4}
          value={currentProject.site.meta.summary}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="publisher">Publisher</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="publisher"
          name="publisher"
          onChange={handleChange}
          required
          type="text"
          value={currentProject.site.meta.publisher}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <input
          accept="image/*"
          color="primary"
          id="cover"
          name="cover"
          onChange={handleChange}
          style={{ display: 'none' }}
          type="file"
        />
        <label htmlFor="cover">
          <Button startIcon={<AddIcon />} fullWidth variant="contained" component="span">
            Select image
          </Button>
        </label>
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(MetaInformation);
