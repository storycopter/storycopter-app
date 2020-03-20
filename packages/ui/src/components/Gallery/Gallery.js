import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { array, string } from 'prop-types';
import { sortBy } from 'lodash';

import Image from './Image';

const Slide = styled(({ cover, ...props }) => <figure {...props} />)`
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
        .non-gatsby-image,
        .gatsby-image-wrapper {
          max-height: 100vh !important;
          width: 100% !important;
        }
      `;
    }
  }};
`;

const Element = styled(({ ...props }) => <div {...props} />)``;

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
    const { cover, images, mask } = this.props;

    // console.group('Gallery.js');
    // console.log(this.props);
    // console.groupEnd();

    const settings = {
      adaptiveHeight: false,
      arrows: false,
      dots: false,
      slidesToShow: 1,
      variableWidth: false,
    };

    return (
      <Element>
        <Slider ref={c => (this.slider = c)} {...settings}>
          {images.length > 1 ? (
            sortBy(images, [o => o.order]).map((image, i) => {
              const imageProps = {
                alt: image.alt,
                caption: image.caption,
                fixed: image.fixed,
                images: images,
                mask: mask,
                onNextImage: this.nextSlide,
                onPrevImage: this.prevSlide,
                raw: image.raw,
              };
              return (
                <Slide cover={cover} key={i}>
                  <Image {...imageProps} i={i}></Image>
                </Slide>
              );
            })
          ) : (
            <Image
              alt={images[0].alt}
              caption={images[0].caption}
              fixed={images[0].fixed}
              images={images}
              mask={mask}
              raw={images[0].raw}
            />
          )}
        </Slider>
      </Element>
    );
  }
}

export default Gallery;

Gallery.propTypes = {
  images: array.isRequired,
  mask: string,
};
Gallery.defaultProps = {
  mask: null,
};
