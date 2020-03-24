import React, { useState } from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';
import uploadFile from '../../../utils/uploadFile';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import TextField from '@material-ui/core/TextField';
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

const MetaControls = ({ data, update }) => {
  const classes = useStyles();

  const { basepath, site } = data.currentProject;
  const { meta } = site;

  const [coverEnabled, setCoverEnabled] = useState(meta.coverEnabled);
  const [coverImage, setCoverImage] = useState(meta.coverImage && meta.coverImage.name ? meta.coverImage.name : null);
  const [publisher, setPublisher] = useState(meta.publisher);
  const [summary, setSummary] = useState(meta.summary);
  const [title, setTitle] = useState(meta.title);

  const onMetaUpdate = payload => {
    update({
      ...produce(data, nextData => {
        nextData.currentProject.site.meta = {
          ...nextData.currentProject.site.meta,
          ...payload,
        };
      }),
    });
  };

  const onAddCover = () => {
    const destination = 'src/site/assets/';
    const file = uploadFile(basepath, destination);
    if (file) {
      onMetaUpdate({
        coverImage: {
          name: file.name,
        },
      });
      setCoverImage(file.name);
    }
  };

  const textFieldProps = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
    },
    margin: 'dense',
    type: 'text',
    variant: 'filled',
  };

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <TextField
        {...textFieldProps}
        inputProps={{ onBlur: e => onMetaUpdate({ title: e.target.value }), maxLength: 30 }}
        label="Title"
        onChange={e => setTitle(e.target.value)}
        value={title || ''}
      />
      <TextField
        {...textFieldProps}
        inputProps={{ onBlur: e => onMetaUpdate({ summary: e.target.value }) }}
        label="Summary"
        multiline
        onChange={e => setSummary(e.target.value)}
        rowsMax={4}
        value={summary || ''}
      />
      <TextField
        {...textFieldProps}
        inputProps={{ onBlur: e => onMetaUpdate({ publisher: e.target.value }) }}
        label="Publisher name"
        onChange={e => setPublisher(e.target.value)}
        placeholder="e.g. New York Times"
        value={publisher || ''}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={coverEnabled}
            color="primary"
            id="coverEnabled"
            name="coverEnabled"
            onChange={e => {
              setCoverEnabled(e.target.checked);
              onMetaUpdate({ coverEnabled: e.target.checked });
            }}
          />
        }
        label={<Typography variant="overline">Enable cover</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {coverImage ? (
              <img alt="Cover" height="100" src={`file:///${basepath}/src/site/assets/${coverImage}`} title="Cover" />
            ) : (
              <Box height="100px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={coverEnabled ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <Button
              color="primary"
              component="span"
              disabled={!coverEnabled}
              fullWidth
              onClick={onAddCover}
              size="small">
              Choose file…
            </Button>
          </CardActions>
        </Card>
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(MetaControls);
