import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

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

const MetaInformation = props => {
  const classes = useStyles();

  const { data, update } = props;
  const { currentProject } = data;
  const { basepath } = currentProject;
  const { site } = currentProject;
  const { meta } = site;

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
          onChange={handleInputChange}
          required
          type="text"
          value={meta.title}
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
          onChange={handleInputChange}
          required
          type="text"
          rowsMax={4}
          value={meta.summary}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="publisher">Publisher</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="publisher"
          name="publisher"
          onChange={handleInputChange}
          required
          type="text"
          value={meta.publisher}
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

export default connect(({ data }) => ({ data }), { update })(MetaInformation);
