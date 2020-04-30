import figure from './figure';
import slideshow from './slideshow';
import headline from './headline';

export default {
  headline: {
    name: 'Headline',
    schema: headline,
    settings: {
      align: true,
      backgColor: true,
      backgImage: true,
      fullSize: true,
      maskColor: true,
      slices: false,
      textColor: true,
    },
  },
  figure: {
    name: 'Figure',
    schema: figure,
    settings: {
      backgColor: true,
      fullSize: true,
      image: true,
      textColor: true,
      title: true,
    },
  },
  slideshow: {
    name: 'Slideshow',
    schema: slideshow,
    settings: {
      backgColor: true,
      fullSize: true,
      order: true,
      images: true,
      textColor: true,
    },
  },
};
