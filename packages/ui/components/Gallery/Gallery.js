import './react-slick.css';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { array } from 'prop-types';
import { sortBy } from 'lodash';

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
const Slide = styled(({ cover, mask, theme, ...props }) => <figure {...props} />)`
  position: relative;
  ${({ cover }) => {
    if (cover) {
      return `
        min-height: 100vh;
        min-width: 100vw;
        .gatsby-image-wrapper {
          height: 100vh !important;
          width: 100vw !important;
          line-height: 0;
        }
      `;
    } else {
      return `
        .gatsby-image-wrapper {
          max-height: 100vh !important;
          width: 100% !important;
        }
      `;
    }
  }};

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

const Element = styled(({ mask, theme, ...props }) => <section {...props} />)``;

const styles = {
  SliderArrows: {
    background: 'transparent',
    margin: '0 5px',
    '&:hover': {
      background: 'transparent',
    },
  },
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: null };
  }

  enterEditMode = node => {
    this.setState({ edit: node });
  };

  nextSlide = () => {
    this.slider.slickNext();
  };
  prevSlide = () => {
    this.slider.slickPrev();
  };

  render() {
    const { cover, classes, images, mask, theme } = this.props;

    console.group('Gallery.js');
    console.log(images);
    console.groupEnd();

    const settings = {
      adaptiveHeight: false,
      arrows: false,
      dots: false,
      slidesToShow: 1,
      variableWidth: false,
    };

    return (
      <Element theme={theme}>
        <Slider ref={c => (this.slider = c)} {...settings}>
          {sortBy(images, [o => o.order]).map((image, i) => {
            return (
              <Slide cover={cover} key={image.order} mask={mask} theme={theme}>
                <Img fixed={image.fixed} cropFocus="cover" />
                <Caption theme={theme}>
                  <CaptionCount>
                    <IconButton color="inherit" size="small" onClick={this.prevSlide} className={classes.SliderArrows}>
                      <ArrowBackIcon fontSize="inherit" />
                    </IconButton>{' '}
                    {i < 10 ? `0${i + 1}` : i + 1} / {images.length < 10 ? `0${images.length}` : images.length}{' '}
                    <IconButton color="inherit" size="small" onClick={this.nextSlide} className={classes.SliderArrows}>
                      <ArrowForwardIcon fontSize="inherit" />
                    </IconButton>
                  </CaptionCount>
                  <CaptionText>{image.caption ? image.caption : ' '}</CaptionText>
                </Caption>
              </Slide>
            );
          })}
        </Slider>
      </Element>
    );
  }
}

export default withTheme(withStyles(styles)(Gallery));

Gallery.propTypes = {
  images: array.isRequired,
};
Gallery.defaultProps = {};
