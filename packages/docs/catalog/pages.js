import { Topbar } from '@storycopter/ui/partials';
import { Headline } from '@storycopter/ui/components';
import { IdocProvider } from '@storycopter/ui/providers';

const pages = [
  {
    title: 'Components',
    pages: [
      {
        title: 'Headline',
        content: require('./pages/headline.md'),
        path: '/blocks/headline',
        imports: {
          Headline: Headline,
          ThemeProvider: IdocProvider,
        },
      },
    ],
  },
  {
    title: 'Partials',
    pages: [
      {
        title: 'Topbar',
        content: require('./pages/topbar.md'),
        path: '/blocks/topbar',
        imports: {
          Topbar: Topbar,
          ThemeProvider: IdocProvider,
        },
      },
    ],
  },
];

export default pages;
