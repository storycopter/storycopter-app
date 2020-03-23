import React, { useState } from 'react';
import produce from 'immer';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';
import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import Popover from '@material-ui/core/Popover';
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
  colorPaper: {
    width: '270px',
  },
  colorPreview: {
    height: theme.spacing(2),
    width: theme.spacing(2),
  },
  colorPicker: {
    ...theme.typography.caption,
    background: 'none !important',
    boxShadow: 'none !important',
    border: 'none !important',
  },
  resetButton: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
}));

const BrandControls = ({ data, update }) => {
  const classes = useStyles();

  const { basepath, site } = data.currentProject;
  const { brand } = site;

  const [backgColor, setBackgColor] = useState(brand.backgColor || '#ffffff');
  const [brandColor, setBrandColor] = useState(brand.brandColor || '#4051b5');
  const [faviconEnabled, setFaviconEnabled] = useState(brand.faviconEnabled || false);
  const [logoEnabled, setLogoEnabled] = useState(brand.logoEnabled || false);
  const [textColor, setTextColor] = useState(brand.textColor || '#333333');
  const [typography, setTypography] = useState(brand.typography || 'modern');

  const backgPickerState = usePopupState({
    variant: 'popover',
    popupId: 'backgPicker',
  });
  const brandcPickerState = usePopupState({
    variant: 'popover',
    popupId: 'brandcPicker',
  });
  const textPickerState = usePopupState({
    variant: 'popover',
    popupId: 'textPicker',
  });

  const onBrandUpdate = payload => {
    console.log('onBrandUpdate', payload);
    update({
      ...produce(data, nextData => {
        nextData.currentProject.site.brand = {
          ...nextData.currentProject.site.brand,
          ...payload,
        };
      }),
    });
  };

  const popoverProps = {
    PaperProps: {
      className: classes.colorPaper,
    },
    disablePortal: true,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  };
  const pickerProps = {
    className: classes.colorPicker,
    disableAlpha: true,
    presetColors: [],
    width: 'auto',
  };
  const textFieldProps = {
    fullWidth: true,
    margin: 'dense',
    type: 'text',
    variant: 'filled',
  };

  console.group('BrandControls.js');
  console.log('typography', typography);
  console.groupEnd();

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <FormControlLabel
        control={
          <Checkbox
            checked={logoEnabled}
            color="primary"
            id="logoEnabled"
            name="logoEnabled"
            onChange={e => {
              setLogoEnabled(e.target.checked);
              onBrandUpdate({ logoEnabled: e.target.checked });
            }}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable logo</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {brand.logo && brand.logo.name ? (
              <img
                alt="Logo"
                height="100"
                src={`file:///${basepath}/src/site/assets/${brand.logo.name}`}
                title="Logo"
              />
            ) : (
              <Box height="100px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={logoEnabled ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              accept="image/*"
              color="primary"
              disabled={!logoEnabled}
              id="logo"
              name="logo"
              // onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="logo" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!logoEnabled} fullWidth size="small">
                Choose file…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={faviconEnabled}
            color="primary"
            id="faviconEnabled"
            name="faviconEnabled"
            onChange={e => {
              setFaviconEnabled(e.target.checked);
              onBrandUpdate({ faviconEnabled: e.target.checked });
            }}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable favicon</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {brand.favicon && brand.favicon.name ? (
              <img
                alt="Favicon"
                height="36"
                src={`file:///${basepath}/src/site/assets/${brand.favicon.name}`}
                title="Favicon"
              />
            ) : (
              <Box height="36px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={faviconEnabled ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              accept=".ico"
              color="primary"
              disabled={!faviconEnabled}
              id="favicon"
              name="favicon"
              // onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="favicon" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!faviconEnabled} fullWidth size="small">
                Choose file…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>

      <TextField
        {...bindTrigger(brandcPickerState)}
        {...textFieldProps}
        label="Brand color"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Avatar
                className={classes.colorPreview}
                style={{ backgroundColor: brandColor || 'transparent' }}
                variant="rounded">
                <></>
              </Avatar>
            </InputAdornment>
          ),
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
        value={brandColor ? brandColor.substr(1, 6) : ''}
      />
      <Popover {...bindPopover(brandcPickerState)} {...popoverProps}>
        <SketchPicker
          {...pickerProps}
          color={brandColor ? brandColor : '#ffffff'}
          onChange={({ hex }) => setBrandColor(hex)}
          onChangeComplete={({ hex }) => onBrandUpdate({ brandColor: hex })}
        />
      </Popover>

      <TextField
        {...bindTrigger(backgPickerState)}
        {...textFieldProps}
        label="Background color"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Avatar
                className={classes.colorPreview}
                style={{ backgroundColor: backgColor || 'transparent' }}
                variant="rounded">
                <></>
              </Avatar>
            </InputAdornment>
          ),
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
        value={backgColor ? backgColor.substr(1, 6) : ''}
      />
      <Popover {...bindPopover(backgPickerState)} {...popoverProps}>
        <SketchPicker
          {...pickerProps}
          color={backgColor ? backgColor : '#ffffff'}
          onChange={({ hex }) => setBackgColor(hex)}
          onChangeComplete={({ hex }) => onBrandUpdate({ backgColor: hex })}
        />
      </Popover>

      <TextField
        {...bindTrigger(textPickerState)}
        {...textFieldProps}
        label="Text color"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Avatar
                className={classes.colorPreview}
                style={{ backgroundColor: textColor || 'transparent' }}
                variant="rounded">
                <></>
              </Avatar>
            </InputAdornment>
          ),
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
        value={textColor ? textColor.substr(1, 6) : ''}
      />
      <Popover {...bindPopover(textPickerState)} {...popoverProps}>
        <SketchPicker
          {...pickerProps}
          color={textColor ? textColor : '#333333'}
          onChange={({ hex }) => setTextColor(hex)}
          onChangeComplete={({ hex }) => onBrandUpdate({ textColor: hex })}
        />
      </Popover>

      <TextField
        {...textFieldProps}
        SelectProps={{ disableUnderline: true }}
        label="Typography"
        onChange={e => {
          onBrandUpdate({ typography: e.target.value });
          setTypography(e.target.value);
        }}
        select
        value={typography}>
        <MenuItem value="modern">Modern</MenuItem>
        <MenuItem value="classic">Classic</MenuItem>
      </TextField>
    </form>
  );
};

export default connect(({ data }) => ({ data }), { update })(BrandControls);
