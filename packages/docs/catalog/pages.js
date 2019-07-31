import Headline from '@storycopter/ui/components/Headline/Headline';
import IdocProvider from '@storycopter/ui/providers/IdocProvider';

const pages = [
  {
    title: 'Components',
    pages: [
      {
        title: 'Headline',
        content: require('./pages/headlines.md'),
        path: '/blocks/headline',
        imports: {
          Headline: Headline,
          ThemeProvider: IdocProvider,
        },
      },
    ],
  },
];

export default pages;
