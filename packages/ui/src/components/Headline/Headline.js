import PropTypes from 'prop-types';
import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import useTheme from '@material-ui/core/styles/useTheme';

import { color } from '../../settings';

const useStyles = (align, cover, fill, mask, paint) =>
  makeStyles(theme => ({
    headlineRoot: {
      backgroundColor: paint ? paint : 'transparent',
      backgroundImage: fill ? `url(${fill})` : 'none',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
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
        backgroundColor: mask ? (mask === 'dark' ? color.shadow500 : color.flare500) : 'transparent',
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
      [theme.breakpoints.up('xl')]: {
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
  cover = false,
  fill = null,
  mask = null,
  paint = null,
  subtitle = null,
  text = null,
  title = null,
  ...props
}) {
  // const theme = useTheme();
  const classes = useStyles(align, cover, fill, mask, paint)();

  return (
    <Box className={classes.headlineRoot}>
      <Container className={classes.headlineContainer}>
        <Box className={classes.headlineContent}>
          {title ? (
            <Typography className={classes.headlineTitle} variant="h1">
              {title}
            </Typography>
          ) : null}
          {subtitle ? (
            <Typography className={classes.headlineSubtitle} variant="h2">
              {subtitle}
            </Typography>
          ) : null}
          {text ? (
            <Typography className={classes.headlineText} variant="h4" component="p">
              {subtitle}
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
  cover: PropTypes.bool,
  fill: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    color: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  mask: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
};
