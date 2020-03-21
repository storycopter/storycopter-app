import PropTypes from 'prop-types';
import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import docTheme from '../../themes/docTheme';

import { colors } from '../../themes/settings';

const useStyles = (align, color, cover, fill, mask, paint) =>
  makeStyles(theme => ({
    headlineRoot: {
      backgroundColor: paint ? paint : 'transparent',
      backgroundImage: fill ? (fill.raw ? `url(${fill.raw})` : `url(${fill.fixed.src})`) : 'none',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: color ? color : 'inherit',
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
        backgroundColor: mask ? (mask === 'dark' ? colors.shadow[500] : colors.flare[500]) : 'transparent',
        bottom: 0,
        content: mask ? `' '` : 'none',
        display: mask ? 'block' : 'none',
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
  children = null,
  color = null,
  cover = false,
  fill = null,
  isEditable = false,
  mask = null,
  paint = null,
  ...props
}) {
  const classes = useStyles(align, color, cover, fill, mask, paint)();

  const onInputBlur = (e, key) => {
    props.onElementUpdate({
      [key]: e.target.value,
    });
  };

  return (
    <Box className={classes.headlineRoot}>
      <Container className={classes.headlineContainer} maxWidth="xl">
        <Box className={classes.headlineContent}>
          {isEditable || props.title ? (
            <Typography className={classes.headlineTitle} component="div" variant="h1">
              {isEditable ? (
                <TextField
                  defaultValue={props.title}
                  fullWidth
                  id="title"
                  inputProps={{
                    className: classes.headlineTitleInput,
                    maxLength: 150,
                    onBlur: e => onInputBlur(e, 'title'),
                  }}
                  margin="none"
                  multiline
                  name="title"
                  placeholder="Enter title…"
                  rowsMax="5"
                  type="text"
                  variant="outlined"
                />
              ) : (
                <h1>{props.title}</h1>
              )}
            </Typography>
          ) : null}
          {isEditable || props.subtitle ? (
            <Typography className={classes.headlineSubtitle} component="div" variant="h3">
              {isEditable ? (
                <TextField
                  defaultValue={props.subtitle}
                  fullWidth
                  id="subtitle"
                  inputProps={{
                    className: classes.headlineSubtitleInput,
                    maxLength: 150,
                    onBlur: e => onInputBlur(e, 'subtitle'),
                  }}
                  margin="none"
                  multiline
                  name="title"
                  placeholder="Enter subtitle…"
                  rowsMax="5"
                  type="text"
                  variant="outlined"
                />
              ) : (
                <h2>{props.subtitle}</h2>
              )}
            </Typography>
          ) : null}
          {isEditable || props.text ? (
            <Typography className={classes.headlineText} component="div" variant="h5">
              {isEditable ? (
                <TextField
                  defaultValue={props.text}
                  fullWidth
                  id="text"
                  inputProps={{
                    className: classes.headlineTextInput,
                    maxLength: 250,
                    onBlur: e => onInputBlur(e, 'text'),
                  }}
                  margin="none"
                  multiline
                  name="title"
                  placeholder="Enter text…"
                  rowsMax="5"
                  type="text"
                  variant="outlined"
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  color: PropTypes.string,
  cover: PropTypes.bool,
  fill: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isEditable: PropTypes.bool,
  mask: PropTypes.string,
  onElementUpdate: PropTypes.func,
  paint: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
};
