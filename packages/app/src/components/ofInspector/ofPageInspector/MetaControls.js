import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import produce from 'immer';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

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

  const { basepath, pages, site } = data.currentProject;
  const { activePageId, activeElementId } = data.editor;

  const activePage = activePageId ? _.find(pages, o => o.meta.uid === activePageId) : null;
  const activePageIndex = activePageId ? _.findIndex(pages, o => o.meta.uid === activePageId) : null;
  // const activeComponentIndex = _.findIndex(activePage.tree.components, o => o.id === activeElementId);

  const [coverEnabled, setCoverEnabled] = useState(activePage.meta.coverEnabled);
  const [coverImage, setCoverImage] = useState(activePage.meta.coverImage);
  const [summary, setSummary] = useState(activePage.meta.summary);
  const [title, setTitle] = useState(activePage.meta.title);

  const onMetaUpdate = payload => {
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].meta = {
          ...nextData.currentProject.pages[activePageIndex].meta,
          ...payload,
        };
      }),
    });
  };

  useEffect(() => {
    setCoverEnabled(activePage.meta.coverEnabled);
    setCoverImage(activePage.meta.coverImage);
    setSummary(activePage.meta.summary);
    setTitle(activePage.meta.title);
  }, [activePage]);

  const textFieldProps = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
    },
    margin: 'dense',
    type: 'text',
    variant: 'filled',
  };

  // console.group('MetaControls.js');
  // console.log('activePageId', activePageId);
  // console.log('activePage', activePage);
  // console.groupEnd();

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <TextField
        {...textFieldProps}
        inputProps={{ onBlur: e => onMetaUpdate({ title: e.target.value }) }}
        label="Page title"
        onChange={e => setTitle(e.target.value)}
        value={title || ''}
      />
      <TextField
        {...textFieldProps}
        inputProps={{ onBlur: e => onMetaUpdate({ summary: e.target.value }) }}
        label="Page summary"
        multiline
        onChange={e => setSummary(e.target.value)}
        rowsMax={4}
        value={summary || ''}
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
        label={<Typography variant="overline">Enable page cover</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {coverImage && coverImage.name ? (
              <img
                alt="Cover"
                height="100"
                src={`file:///${basepath}/src/pages/${activePageId}/${coverImage.name}`}
                title="Cover"
              />
            ) : (
              <Box height="100px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={coverEnabled ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              // onChange={handleInputChange}
              accept="image/*"
              color="primary"
              disabled={!coverEnabled}
              id="cover"
              name="cover"
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="cover" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!coverEnabled} fullWidth size="small">
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
