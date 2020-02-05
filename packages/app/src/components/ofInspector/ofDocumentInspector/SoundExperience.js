import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';
import ReactPlayer from 'react-player';

import {
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Slider,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardContent: {
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
  const { enableSound, track } = currentProject.site.sound;
  const trackPath = `${basepath}src/site/assets/${track}`;

  const [trackDuration, setTrackDuration] = React.useState(0);
  const [trackPlaying, setTrackPlaying] = React.useState(false);
  const [trackProgress, setTrackProgress] = React.useState(0);

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
    setTrackPlaying(false);
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
            checked={enableSound}
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
        <Card elevation={0}>
          <CardContent>
            <ReactPlayer
              height="10px"
              loop
              onProgress={obj => setTrackProgress(obj.playedSeconds)}
              onReady={player => setTrackDuration(player.getDuration())}
              playing={trackPlaying}
              url={trackPath}
              width="100%"
              config={{
                file: {
                  forceAudio: true,
                },
              }}
            />
            <Grid
              alignContent="center"
              alignItems="center"
              container
              direction="row"
              justify="space-between"
              wrap="nowrap"
              spacing={2}>
              <Grid item>
                <IconButton
                  aria-label="Play"
                  disabled={!enableSound}
                  onClick={() => setTrackPlaying(!trackPlaying)}
                  size="small">
                  {trackPlaying ? <PauseIcon fontSize="inherit" /> : <PlayArrowIcon fontSize="inherit" />}
                </IconButton>
              </Grid>
              <Grid item xs>
                <Slider
                  aria-labelledby="continuous-slider"
                  disabled={!enableSound}
                  max={trackDuration}
                  min={0}
                  onChange={CHANGED => console.log(CHANGED)}
                  onChangeCommitted={COMMITTED => console.log(COMMITTED)}
                  value={trackProgress}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <input
              accept=".mp3,.m4a"
              color="primary"
              disabled={!enableSound}
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
                disabled={!enableSound}
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
