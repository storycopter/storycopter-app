import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardMedia: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardLabel: {
    display: 'block',
    margin: '0 !important',
    width: '100%',
  },
}));

const MetaControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject } = data;
  const { basepath } = currentProject;
  const { site } = currentProject;
  const { meta } = site;

  const [state, setState] = React.useState({
    title: meta.title,
    summary: meta.summary,
    publisher: meta.publisher,
  });

  const handleUpdate = payload => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...site,
          meta: {
            ...meta,
            ...payload,
          },
        },
      },
    });
  };

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputBlur = e => {
    handleUpdate({ [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = e => {
    handleUpdate({ [e.target.name]: e.target.checked });
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
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          required
          type="text"
          value={state.title}
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
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          required
          rowsMax={4}
          type="text"
          value={state.summary}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="publisher">Publisher</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="publisher"
          name="publisher"
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          required
          type="text"
          value={state.publisher}
        />
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={meta.enableCover}
            color="primary"
            id="enableCover"
            name="enableCover"
            onChange={handleCheckboxChange}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable cover</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {meta.cover && meta.cover.name ? (
              <img alt="Cover" height="100" src={`${basepath}src/site/assets/${meta.cover.name}`} title="Cover" />
            ) : (
              <Box height="100px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={meta.enableCover ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              accept="image/*"
              color="primary"
              disabled={!meta.enableCover}
              id="cover"
              name="cover"
              onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="cover" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!meta.enableCover} fullWidth size="small">
                Choose file…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(MetaControls);
