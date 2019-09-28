import './react-slick.css';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import styled from 'styled-components';
import { array, func, object, string } from 'prop-types';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';
import { withTheme } from '@material-ui/styles';

import { breakpoint, color } from '@storycopter/ui/settings';
import { setType, setSpace } from '@storycopter/ui/mixins';

const CaptionCount = styled(({ ...props }) => <span {...props} />)`
  ${setType('x')};
  display: block;
`;
const CaptionText = styled(({ ...props }) => <span {...props} />)`
  ${setType('x')};
  display: block;
`;
const Caption = styled(({ theme, ...props }) => <figcaption {...props} />)`
  ${setSpace('pal')};
  bottom: 0;
  color: ${({ theme }) => theme.palette.text.primary};
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 2;
  ${breakpoint.phone} {
    ${setSpace('pam')};
    ${setSpace('max')};
  }
`;
const Element = styled(({ mask, ...props }) => <div {...props} />)`
  position: relative;
  ${({ mask }) => {
    if (mask) {
      return `
      &:before {
        background: ${mask === 'dark' ? color.shadow500 : color.flare500};
        bottom: 0;
        content: " ";
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
        `;
    }
  }};
`;

const styles = {
  SliderArrows: {
    background: 'transparent',
    margin: '0 5px',
    '&:hover': {
      background: 'transparent',
    },
  },
};

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: null };
  }

  enterEditMode = node => {
    this.setState({ edit: node });
  };

  render() {
    const { alt, caption, classes, fixed, i, images, mask, onNextImage, onPrevImage, theme } = this.props;

    console.group('Image.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Element mask={mask}>
        <Img alt={alt} fixed={fixed} cropFocus="cover" />
        <Caption theme={theme}>
          {images.length > 1 ? (
            <CaptionCount>
              <IconButton className={classes.SliderArrows} color="inherit" onClick={onPrevImage} size="small">
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>{' '}
              {i < 10 ? `0${i + 1}` : i + 1} / {images.length < 10 ? `0${images.length}` : images.length}{' '}
              <IconButton className={classes.SliderArrows} color="inherit" onClick={onNextImage} size="small">
                <ArrowForwardIcon fontSize="inherit" />
              </IconButton>
            </CaptionCount>
          ) : null}
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </Element>
    );
  }
}

export default withTheme(withStyles(styles)(Image));

Image.propTypes = {
  alt: string.isRequired,
  caption: string,
  fixed: object.isRequired,
  images: array.isRequired,
  mask: string,
  onNextImage: func,
  onPrevImage: func,
  theme: object,
};
Image.defaultProps = {
  caption: ' ',
  mask: null,
  onNextImage: null,
  onPrevImage: null,
};
