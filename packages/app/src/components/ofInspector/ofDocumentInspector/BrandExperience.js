import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
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
    jusitfyContent: 'center',
  },
  cardLabel: {
    display: 'block',
    margin: '0 !important',
    width: '100%',
  },
}));

const BrandExperience = props => {
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
          brand: {
            ...currentProject.site.brand,
            [e.target.name]: e.target.checked,
          },
        },
      },
    });
  };

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <FormControlLabel
        control={
          <Checkbox
            checked={currentProject.site.brand.enableLogo}
            color="primary"
            id="enableLogo"
            name="enableLogo"
            onChange={handleCheckbox}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable logo</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia
            alt={`Logo`}
            component="img"
            className={classes.cardMedia}
            height="100"
            image={`${basepath}src/site/assets/${currentProject.site.brand.logo.name}`}
            title={`Logo`}
          />
          <CardActions>
            <input
              accept="image/*"
              color="primary"
              disabled={!currentProject.site.brand.enableLogo}
              id="logo"
              name="logo"
              onChange={handleChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="logo" className={classes.cardLabel}>
              <Button
                color="primary"
                component="span"
                disabled={!currentProject.site.brand.enableLogo}
                fullWidth
                size="small"
                startIcon={<PanoramaOutlinedIcon />}>
                Select…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={currentProject.site.brand.enableFavicon}
            color="primary"
            id="enableFavicon"
            name="enableFavicon"
            onChange={handleCheckbox}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable favicon</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia
            alt={`Favicon`}
            className={classes.cardMedia}
            component="img"
            height="40"
            image={`${basepath}src/site/assets/${currentProject.site.brand.logo.name}`}
            title={`Favicon`}
          />
          <CardActions>
            <input
              accept=".ico"
              color="primary"
              disabled={!currentProject.site.brand.enableFavicon}
              id="favicon"
              name="favicon"
              onChange={handleChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="favicon" className={classes.cardLabel}>
              <Button
                color="primary"
                component="span"
                disabled={!currentProject.site.brand.enableFavicon}
                fullWidth
                size="small"
                startIcon={<PanoramaOutlinedIcon />}>
                Select…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="brandColor">Brand color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="brandColor"
          name="brandColor"
          onChange={handleChange}
          type="color"
          value={currentProject.site.brand.brandColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="backgColor">Background color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="backgColor"
          name="backgColor"
          onChange={handleChange}
          type="color"
          value={currentProject.site.brand.backgColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="textColor">Text color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="textColor"
          name="textColor"
          onChange={handleChange}
          type="color"
          value={currentProject.site.brand.textColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="typography">Typography</InputLabel>
        <Select
          disableUnderline
          fullWidth
          id="typography"
          name="typography"
          onChange={handleChange}
          required
          type="text"
          value={currentProject.site.brand.typography}>
          <MenuItem value="modern">Modern</MenuItem>
          <MenuItem value="classic">Classic</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(BrandExperience);
