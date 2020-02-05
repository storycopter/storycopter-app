import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardMedia: {
    display: 'flex',
    flexDirection: 'row',
    jusitfyContent: 'center',
  },
  cardLabel: {
    display: 'block',
    margin: '0 !important',
    width: '100%',
  },
}));

const SoundExperience = props => {
  const { data, update } = props;
  const { currentProject } = data;
  const { basepath } = currentProject;

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

  const handleCheckbox = e => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...currentProject.site,
          sound: {
            ...currentProject.site.sound,
            [e.target.name]: e.target.checked,
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
      <FormControlLabel
        control={
          <Checkbox
            checked={currentProject.site.sound.enableSound}
            color="primary"
            id="enableSound"
            name="enableSound"
            onChange={handleCheckbox}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable background sound</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card>
          <CardMedia
            alt={`Soundtrack`}
            component="img"
            className={classes.cardMedia}
            height="100"
            image={`${basepath}src/site/${currentProject.site.meta.cover.name}`}
            title={`Soundtrack`}
          />
          <CardActions>
            <input
              accept=".mp3,.m4a"
              color="primary"
              disabled={!currentProject.site.sound.enableSound}
              id="soundtrack"
              name="soundtrack"
              onChange={handleChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="soundtrack" className={classes.cardLabel}>
              <Button
                color="primary"
                component="span"
                disabled={!currentProject.site.sound.enableSound}
                fullWidth
                size="small"
                startIcon={<EqualizerOutlinedIcon />}>
                Select soundtrack
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(SoundExperience);
