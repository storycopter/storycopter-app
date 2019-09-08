/** @format */

import Headline from '@storycopter/ui/components/Headline/Headline';
import IdocProvider from '@storycopter/ui/providers/IdocProvider';
import { CreditsIcon, PointerIcon, ShareIcon } from '@storycopter/ui/elements';

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
    ],
  },
];

export default pages;
