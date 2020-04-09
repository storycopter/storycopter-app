import React, { useState } from 'react';
import _ from 'lodash';
import produce from 'immer';
import uploadFile from '../../../utils/uploadFile';
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
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  colorPaper: {
    width: '240px',
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

const DecorControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor } = data;
  const { basepath, essentials, pages, site } = currentProject;
  const { activePageId, activeElementId } = editor;
  const { brand } = site;

  const isEssential = ['credits', 'home'].includes(activePageId);
  const targetEntity = isEssential ? 'essentials' : 'pages';

  const activePage = isEssential ? essentials[activePageId] : _.find(pages, o => o.meta.uid === activePageId);
  const activePageIndex = !isEssential ? _.findIndex(pages, o => o.meta.uid === activePageId) : null;
  const activeElementIndex = _.findIndex(activePage.elements, o => o.id === activeElementId);
  const activeElement = isEssential
    ? activePage.elements[activeElementIndex]
    : pages[activePageIndex].elements[activeElementIndex];

  const [backgColor, setBackgColor] = useState(activeElement.settings.backgColor);
  const [maskColor, setMaskColor] = useState(activeElement.settings.maskColor);
  const [textColor, setTextColor] = useState(activeElement.settings.textColor);

  const backgPickerState = usePopupState({
    variant: 'popover',
    popupId: 'backgPicker',
  });
  const maskPickerState = usePopupState({
    variant: 'popover',
    popupId: 'maskPicker',
  });
  const textPickerState = usePopupState({
    variant: 'popover',
    popupId: 'textPicker',
  });

  const onElementUpdate = payload => {
    if (isEssential) {
      update({
        ...produce(data, nextData => {
          nextData.currentProject.essentials[activePageId].elements[activeElementIndex].settings = {
            ...nextData.currentProject.essentials[activePageId].elements[activeElementIndex].settings,
            ...payload,
          };
        }),
      });
    } else {
      update({
        ...produce(data, nextData => {
          nextData.currentProject.pages[activePageIndex].elements[activeElementIndex].settings = {
            ...nextData.currentProject.pages[activePageIndex].elements[activeElementIndex].settings,
            ...payload,
          };
        }),
      });
    }
    return null;
  };

  const onAddBackgImage = () => {
    const destination = `src/${targetEntity}/${activePage.meta.uid}`;
    const file = uploadFile(basepath, destination, ['jpg', 'png']);
    console.log('onAddBackgImage', { file });
    if (file) {
      onElementUpdate({
        backgImage: {
          name: file.name,
        },
      });
    }
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
    presetColors: [brand.backgColor, brand.textColor, brand.brandColor],
    width: 'auto',
  };
  const resetButtonProps = {
    className: classes.resetButton,
    color: 'primary',
    fullWidth: true,
    size: 'small',
    children: 'Reset',
  };
  const textFieldProps = {
    fullWidth: true,
    margin: 'dense',
    type: 'text',
    variant: 'filled',
  };

  return (
    <div {...props}>
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
                style={{ backgroundColor: textColor ? textColor : 'transparent' }}
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
          color={brand.textColor ? (textColor ? textColor : brand.textColor) : '#cccccc'}
          disableAlpha
          onChange={({ hex }) => setTextColor(hex)}
          onChangeComplete={({ hex }) => onElementUpdate({ textColor: hex })}
        />
        <Button
          {...resetButtonProps}
          onClick={() => {
            onElementUpdate({ textColor: null });
            setTextColor(null);
            textPickerState.close();
          }}
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
                style={{ backgroundColor: backgColor ? backgColor : 'transparent' }}
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
          color={brand.backgColor ? (backgColor ? backgColor : brand.backgColor) : '#cccccc'}
          disableAlpha
          onChange={({ hex }) => setBackgColor(hex)}
          onChangeComplete={({ hex }) => onElementUpdate({ backgColor: hex })}
        />
        <Button
          {...resetButtonProps}
          onClick={() => {
            backgPickerState.close();
            onElementUpdate({ backgColor: null });
            setBackgColor(null);
          }}
        />
      </Popover>
      <TextField
        {...bindTrigger(maskPickerState)}
        {...textFieldProps}
        label="Background mask"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Avatar
                className={classes.colorPreview}
                style={{ backgroundColor: maskColor ? maskColor : 'transparent' }}
                variant="rounded">
                <></>
              </Avatar>
            </InputAdornment>
          ),
        }}
        value={maskColor ? maskColor : ''}
      />
      <Popover {...bindPopover(maskPickerState)} {...popoverProps}>
        <SketchPicker
          {...pickerProps}
          color={brand.brandColor ? (maskColor ? maskColor : brand.brandColor) : 'rgba(0,0,0,0.0)'}
          onChange={({ rgb }) => setMaskColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)}
          onChangeComplete={({ rgb }) => onElementUpdate({ maskColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` })}
        />
        <Button
          {...resetButtonProps}
          onClick={() => {
            maskPickerState.close();
            onElementUpdate({ maskColor: 'rgba(0,0,0,0.0)' });
            setMaskColor('rgba(0,0,0,0.0)');
          }}
        />
      </Popover>

      <FormControlLabel
        control={
          <Checkbox
            checked={activeElement.settings.backgImageEnabled}
            color="primary"
            id="logoEnabled"
            name="logoEnabled"
            onChange={e => onElementUpdate({ backgImageEnabled: e.target.checked })}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable background image</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            <Box height="80px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              {activeElement.settings.backgImage && activeElement.settings.backgImage.name ? (
                <img
                  alt=""
                  height="60"
                  src={`file:///${basepath}/src/pages/${activePage.meta.uid}//${activeElement.settings.backgImage.name}`}
                />
              ) : (
                <PanoramaOutlinedIcon color={activeElement.settings.backgImageEnabled ? 'action' : 'disabled'} />
              )}
            </Box>
          </CardMedia>
          <CardActions>
            <Button
              color="primary"
              disabled={!activeElement.settings.backgImageEnabled}
              fullWidth
              onClick={onAddBackgImage}
              size="small">
              Choose background image…
            </Button>
          </CardActions>
        </Card>
      </FormControl>
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(DecorControls);
