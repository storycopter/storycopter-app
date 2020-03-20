import { CreditsIcon, PointerIcon, ShareIcon } from '@storycopter/ui/elements';
import { Headline, Gallery } from '@storycopter/ui/components';
import { IdocProvider } from '@storycopter/ui/providers';

const pages = [
  {
    title: 'Elements',
    pages: [
      {
        title: 'Icons',
        content: require('./pages/icons.md'),
        path: '/elements/icons',
        imports: {
          CreditsIcon: CreditsIcon,
          PointerIcon: PointerIcon,
          ShareIcon: ShareIcon,
        },
      },
    ],
  },
  {
    title: 'Components',
    pages: [
      {
        title: 'Headline',
        content: require('./pages/headlines.md'),
        path: '/components/headline',
        imports: {
          Headline: Headline,
          ThemeProvider: IdocProvider,
        },
      },
      {
        title: 'Gallery',
        content: require('./pages/galleries.md'),
        path: '/components/gallery',
        imports: {
          Gallery: Gallery,
          ThemeProvider: IdocProvider,
        },
      },
    ],
  },
];

export default pages;
