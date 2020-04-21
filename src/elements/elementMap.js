import headline from './headline';
import slideshow from './slideshow';

const elementMap = {
  headline: {
    name: 'Headline',
    schema: headline,
    settings: ['align', 'fullSize', 'textColor', 'backgColor', 'maskColor', 'backgImage'],
  },
  slideshow: { name: 'Slideshow', schema: slideshow, settings: ['fullSize', 'backgColor', 'maskColor', 'textColor'] },
};

export default elementMap;
