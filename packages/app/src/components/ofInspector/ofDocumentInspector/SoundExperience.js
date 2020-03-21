import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';
import ReactPlayer from 'react-player';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

export default connect(({ data }) => ({ data }), { update })(({ data, update, ...props }) => {
  const classes = useStyles();
  const player = React.createRef();

  const { currentProject } = data;
  const { basepath, site } = currentProject;
  const { sound } = site;
  const { enableSound, track } = sound;
  const trackPath = `${basepath}src/site/assets/${track}`;

  const [trackDuration, setTrackDuration] = React.useState(0);
  const [trackPlaying, setTrackPlaying] = React.useState(false);
  const [trackProgress, setTrackProgress] = React.useState(0);

  const handleUpdate = payload => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...site,
          sound: {
            ...sound,
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
    setTrackPlaying(false);
    handleUpdate({ [e.target.name]: e.target.checked });
  };

  const handleSliderChange = (e, newValue) => {
    setTrackPlaying(true);
    setTrackProgress(newValue);
    if (player && player.current) player.current.seekTo(newValue);
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
            onChange={handleCheckboxChange}
          />
        }
        label={<Typography variant="overline">Enable background sound</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardContent>
            <ReactPlayer
              ref={player}
              height="10px"
              loop
              onReady={player => setTrackDuration(player.getDuration())}
              onProgress={progress => setTrackProgress(progress.playedSeconds)}
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
                  onChange={handleSliderChange}
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
              onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="soundtrack" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!enableSound} fullWidth size="small">
                Select soundtrack
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
    </form>
  );
});
