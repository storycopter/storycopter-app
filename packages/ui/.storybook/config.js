import React from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import docTheme from '../src/themes/docTheme';

import { GlobalStyles } from '../src/components';

addParameters({
  options: {
    showRoots: true,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
});

configureActions({
  depth: 10,
  limit: 25,
});

addDecorator(story => (
  <ThemeProvider theme={docTheme}>
    <GlobalStyles />
    {story()}
  </ThemeProvider>
));
