import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const MotivationControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject } = data;
  const { site } = currentProject;
  const { motivation } = site;

  const [state, setState] = React.useState({
    label: motivation.label,
    link: motivation.link,
  });

  const handleUpdate = payload => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...site,
          motivation: {
            ...motivation,
            ...payload,
          },
        },
      },
    });
  };

  const handleCheckboxChange = e => {
    handleUpdate({ [e.target.name]: e.target.checked });
  };

  const handleInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleInputBlur = e => {
    handleUpdate({ [e.target.name]: e.target.value });
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
            checked={motivation.enable}
            color="primary"
            id="enable"
            name="enable"
            onChange={handleCheckboxChange}
            value="true"
          />
        }
        label={<Typography variant="overline">Motivate readers</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="label">Action label</InputLabel>
        <FilledInput
          disableUnderline
          disabled={!motivation.enable}
          fullWidth
          id="label"
          name="label"
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          type="text"
          value={state.label}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="link">Action link</InputLabel>
        <FilledInput
          disableUnderline
          disabled={!motivation.enable}
          fullWidth
          id="link"
          name="link"
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          type="url"
          value={state.link}
        />
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(MotivationControls);
