import React, { useState } from 'react';
import _ from 'lodash';
import produce from 'immer';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';
import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'relative',
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

const DecorControls = ({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject, editor } = data;
  const { basepath, pages, site } = currentProject;
  const { activePageId, activeElementId } = editor;
  const { brand } = site;

  const activePage = activePageId ? _.find(pages, o => o.meta.uid === activePageId) : null;
  const activePageIndex = activePage ? _.findIndex(pages, o => o.meta.uid === activePageId) : null;
  const activeElementIndex =
    activePageId && activeElementId ? _.findIndex(activePage.tree.components, o => o.id === activeElementId) : null;
  const activeElement = activeElementId ? activePage.tree.components[activeElementIndex] : null;

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
    update({
      ...produce(data, nextData => {
        nextData.currentProject.pages[activePageIndex].tree.components[activeElementIndex].settings = {
          ...nextData.currentProject.pages[activePageIndex].tree.components[activeElementIndex].settings,
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
    </div>
  );
};

export default connect(({ data }) => ({ data }), { update })(DecorControls);
