import './react-slick.css';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { array } from 'prop-types';
import { sortBy } from 'lodash';
import { withTheme } from '@material-ui/styles';

import { breakpoint, color } from '@storycopter/ui/settings';
import { setType, setSpace } from '@storycopter/ui/mixins';

const Caption = styled(({ theme, ...props }) => <div {...props} />)`
  ${setSpace('pal')};
  ${setType('x')};
  bottom: 0;
  color: ${({ theme }) => theme.palette.text.primary};
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 2;
`;

const Slide = styled(({ cover, mask, theme, ...props }) => <div {...props} />)`
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

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: null };
    this.enterEditMode = this.enterEditMode.bind(this);
  }

  enterEditMode(node) {
    this.setState({ edit: node });
  }

  render() {
    const { cover, images, mask, theme } = this.props;

    console.group('Gallery.js');
    console.log(images);
    console.groupEnd();

    return (
      <Element theme={theme}>
        <Slider settings={{ dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 }}>
          {sortBy(images, [o => o.order]).map(image => {
            return (
              <Slide cover={cover} key={image.order} mask={mask} theme={theme}>
                <Img fixed={image.fixed} cropFocus="cover" />
                <Caption theme={theme}>{image.caption}</Caption>
              </Slide>
            );
          })}
        </Slider>
      </Element>
    );
  }
}

export default withTheme(Gallery);

Gallery.propTypes = {
  images: array.isRequired,
};
Gallery.defaultProps = {};
