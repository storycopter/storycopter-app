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
    justifyContent: 'center',
  },
  cardLabel: {
    display: 'block',
    margin: '0 !important',
    width: '100%',
  },
}));

const BrandExperience = props => {
  const classes = useStyles();

  const { data, update } = props;
  const { currentProject } = data;
  const { basepath } = currentProject;
  const { site } = currentProject;
  const { brand } = site;

  const handleUpdate = payload => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...site,
          brand: {
            ...brand,
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
      <FormControlLabel
        control={
          <Checkbox
            checked={brand.enableLogo}
            color="primary"
            id="enableLogo"
            name="enableLogo"
            onChange={handleCheckboxChange}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable logo</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {brand.logo && brand.logo.name ? (
              <img alt="Logo" height="100" src={`${basepath}src/site/assets/${brand.logo.name}`} title="Logo" />
            ) : (
              <Box height="100px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={brand.enableLogo ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              accept="image/*"
              color="primary"
              disabled={!brand.enableLogo}
              id="logo"
              name="logo"
              onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="logo" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!brand.enableLogo} fullWidth size="small">
                Choose file…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={brand.enableFavicon}
            color="primary"
            id="enableFavicon"
            name="enableFavicon"
            onChange={handleCheckboxChange}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable favicon</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {brand.favicon && brand.favicon.name ? (
              <img alt="Favicon" height="36" src={`${basepath}src/site/assets/${brand.favicon.name}`} title="Favicon" />
            ) : (
              <Box height="36px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={brand.enableFavicon ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              accept=".ico"
              color="primary"
              disabled={!brand.enableFavicon}
              id="favicon"
              name="favicon"
              onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="favicon" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!brand.enableFavicon} fullWidth size="small">
                Choose file…
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
          onChange={handleInputChange}
          type="color"
          value={brand.brandColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="backgColor">Background color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="backgColor"
          name="backgColor"
          onChange={handleInputChange}
          type="color"
          value={brand.backgColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="textColor">Text color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="textColor"
          name="textColor"
          onChange={handleInputChange}
          type="color"
          value={brand.textColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="typography">Typography</InputLabel>
        <Select
          disableUnderline
          fullWidth
          id="typography"
          name="typography"
          onChange={handleInputChange}
          required
          type="text"
          value={brand.typography}>
          <MenuItem value="modern">Modern</MenuItem>
          <MenuItem value="classic">Classic</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(BrandExperience);
