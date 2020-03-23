import PropTypes from 'prop-types';
import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import docTheme from '../../themes/docTheme';

const useStyles = (align, backgColor, backgImage, cover, maskColor, textColor) =>
  makeStyles(theme => ({
    headlineRoot: {
      backgroundColor: backgColor ? backgColor : 'transparent',
      backgroundImage: backgImage
        ? backgImage.raw
          ? `url(${backgImage.raw})`
          : `url(${backgImage.fixed.src})`
        : 'none',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: textColor ? textColor : 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: cover ? '100vh' : 'auto',
      paddingBottom: theme.spacing(5),
      paddingTop: theme.spacing(5),
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
      },
      [theme.breakpoints.up('xl')]: {
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
      },
      '&:before': {
        backgroundColor: maskColor ? maskColor : 'transparent',
        bottom: 0,
        content: maskColor ? `' '` : 'none',
        display: maskColor ? 'block' : 'none',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
    },
    headlineContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      position: 'relative',
      textAlign: align === 'center' ? 'center' : 'left',
      zIndex: 2,
    },
    headlineContent: {
      [theme.breakpoints.up('md')]: {
        flex: `0 0 ${(100 / 3) * 2}%`,
      },
      [theme.breakpoints.up('lg')]: {
        flex: `0 0 ${100 / 2}%`,
      },
    },
    headlineTitle: {},
    headlineSubtitle: {
      marginTop: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.up('xl')]: {
        marginTop: theme.spacing(5),
      },
    },
    headlineText: {
      marginTop: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.up('xl')]: {
        marginTop: theme.spacing(5),
      },
    },
    headlineTitleInput: {
      ...docTheme.typography.h1,
    },
    headlineSubtitleInput: {
      ...docTheme.typography.h3,
    },
    headlineTextInput: {
      ...docTheme.typography.h5,
    },
    headlineActionbar: {
      marginTop: theme.spacing(5),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(5),
      },
      [theme.breakpoints.up('xl')]: {
        marginTop: theme.spacing(5),
      },
    },
  }));

export default function Headline({
  align = 'left',
  backgColor = null,
  backgImage = null,
  children = null,
  cover = false,
  isEditable = false,
  maskColor = null,
  style = null,
  textColor = null,
  ...props
}) {
  const classes = useStyles(align, backgColor, backgImage, cover, maskColor, textColor)();

  const onInputBlur = (e, key) => {
    props.onElementUpdate({
      [key]: e.target.value,
    });
  };

  const textFieldProps = {
    fullWidth: true,
    margin: 'none',
    multiline: true,
    rowsMax: '5',
    type: 'text',
    variant: 'outlined',
  };

  // console.group('Headline.js');
  // console.log('maskColor:', maskColor);
  // console.groupEnd();

  return (
    <Box className={classes.headlineRoot} style={style}>
      <Container className={classes.headlineContainer} maxWidth="xl">
        <Box className={classes.headlineContent}>
          {isEditable || props.title ? (
            <Typography className={classes.headlineTitle} component="div" variant="h1" style={{ color: textColor }}>
              {isEditable ? (
                <TextField
                  {...textFieldProps}
                  defaultValue={props.title}
                  id="title"
                  inputProps={{
                    className: classes.headlineTitleInput,
                    maxLength: 150,
                    onBlur: e => onInputBlur(e, 'title'),
                    style: { textAlign: align === 'center' ? 'center' : 'left', color: textColor },
                  }}
                  name="title"
                  placeholder="Add title…"
                />
              ) : (
                <h1>{props.title}</h1>
              )}
            </Typography>
          ) : null}
          {isEditable || props.subtitle ? (
            <Typography className={classes.headlineSubtitle} component="div" variant="h3" style={{ color: textColor }}>
              {isEditable ? (
                <TextField
                  {...textFieldProps}
                  defaultValue={props.subtitle}
                  id="subtitle"
                  inputProps={{
                    className: classes.headlineSubtitleInput,
                    maxLength: 150,
                    onBlur: e => onInputBlur(e, 'subtitle'),
                    style: { textAlign: align === 'center' ? 'center' : 'left', color: textColor },
                  }}
                  name="subtitle"
                  placeholder="Add subtitle…"
                />
              ) : (
                <h2>{props.subtitle}</h2>
              )}
            </Typography>
          ) : null}
          {isEditable || props.text ? (
            <Typography className={classes.headlineText} component="div" variant="h5" style={{ color: textColor }}>
              {isEditable ? (
                <TextField
                  {...textFieldProps}
                  defaultValue={props.text}
                  id="text"
                  inputProps={{
                    className: classes.headlineTextInput,
                    maxLength: 250,
                    onBlur: e => onInputBlur(e, 'text'),
                    style: { textAlign: align === 'center' ? 'center' : 'left', color: textColor },
                  }}
                  name="text"
                  placeholder="Add text…"
                />
              ) : (
                <p>{props.text}</p>
              )}
            </Typography>
          ) : null}
          {children ? <Box className={classes.headlineActionbar}>{children}</Box> : null}
        </Box>
      </Container>
    </Box>
  );
}

Headline.propTypes = {
  align: PropTypes.string,
  backgColor: PropTypes.string,
  backgImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  cover: PropTypes.bool,
  isEditable: PropTypes.bool,
  maskColor: PropTypes.string,
  onElementUpdate: PropTypes.func,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string,
};
