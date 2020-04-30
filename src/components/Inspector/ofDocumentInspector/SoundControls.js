import React from 'react';
import ReactPlayer from 'react-player';
import produce from 'immer';
import { connect } from 'react-redux';

import { update } from '@reducers/data';
import { uploadFile } from '@utils';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
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
  sliderParent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const SoundControls = ({ data, update, ...props }) => {
  const classes = useStyles();
  const player = React.createRef();

  const { basepath, site } = data.currentProject;
  const { sound } = site;

  const [trackDuration, setTrackDuration] = React.useState(0);
  const [trackPlaying, setTrackPlaying] = React.useState(false);
  const [trackProgress, setTrackProgress] = React.useState(0);

  const onSoundUpdate = payload => {
    update({
      ...produce(data, nextData => {
        nextData.currentProject.site.sound = {
          ...data.currentProject.site.sound,
          ...payload,
        };
      }),
    });
  };

  const onAddTrack = () => {
    const destination = 'static/';
    const file = uploadFile(basepath, destination, ['mp3']);
    if (file) {
      onSoundUpdate({
        favicon: {
          name: file.name,
        },
      });
    }
  };

  const onScrub = (e, newTime) => {
    setTrackPlaying(true);
    setTrackProgress(newTime);
    if (player && player.current) player.current.seekTo(newTime);
  };

  return (
    <div {...props}>
      <Typography variant="body2" gutterBottom>
        Background sound will autoplay and crossfade with any inline media that readers may interact with. It may be
        silenced at any time with document’s volume controls.
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={sound.enabled}
            color="primary"
            id="enableSound"
            name="enableSound"
            onChange={e => {
              onSoundUpdate({ enabled: e.target.checked });
              if (e.target.checked === false) setTrackPlaying(false);
            }}
          />
        }
        label={<Typography variant="overline">Enable soundtrack</Typography>}
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
              playing={sound.enabled && trackPlaying}
              url={sound?.track?.name ? `file:///${basepath}/static/${sound.track.name}` : null}
              style={{
                height: '1px',
                overflow: 'hidden',
                position: 'absolute',
                width: '1px',
              }}
            />
            <Grid
              alignContent="center"
              alignItems="center"
              container
              direction="row"
              justify="space-between"
              spacing={2}
              wrap="nowrap">
              <Grid item>
                <IconButton
                  aria-label="Play"
                  disabled={!sound.enabled}
                  onClick={() => setTrackPlaying(!trackPlaying)}
                  size="small">
                  {trackPlaying ? <PauseIcon fontSize="inherit" /> : <PlayArrowIcon fontSize="inherit" />}
                </IconButton>
              </Grid>
              <Grid item xs className={classes.sliderParent}>
                <Slider
                  aria-labelledby="continuous-slider"
                  disabled={!sound.enabled}
                  max={trackDuration}
                  min={0}
                  onChange={onScrub}
                  value={trackProgress}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button color="primary" disabled={!sound.enabled} fullWidth onClick={onAddTrack} size="small">
              Select track…
            </Button>
          </CardActions>
        </Card>
      </FormControl>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(SoundControls);
