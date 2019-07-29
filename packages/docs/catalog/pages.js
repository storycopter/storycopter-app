import { Headline } from '@storycopter/ui/components';
import { SCThemeProvider } from '@storycopter/ui/providers';

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
          ThemeProvider: SCThemeProvider,
        },
      },
    ],
  },
];

export default pages;
