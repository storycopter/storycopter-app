import { Headline } from '@storycopter/ui/src/components';

const pages = [
  {
    title: 'Blocks',
    pages: [
      {
        title: 'Headline',
        content: require('./pages/headline.md'),
        path: '/blocks/headline',
        imports: {
          Headline: Headline,
        },
      },
    ],
  },
];

export default pages;
