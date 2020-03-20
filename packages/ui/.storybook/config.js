import React from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';

// import './storybook.css';

import ThemeProvider from '../src/providers/IdocProvider';

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
  <ThemeProvider>
    <GlobalStyles />
    {story()}
  </ThemeProvider>
));
