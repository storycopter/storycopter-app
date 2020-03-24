import React from 'react';
import { graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Layout from './partials/Layout';
import docTheme from '@storycopter/ui/src/themes/docTheme';

export default function CreditsTpl(props) {
  console.group('CreditsTpl.js');
  console.log(props);
  console.groupEnd();

  return (
    <ThemeProvider theme={docTheme}>
      <Layout contextData={props.pageContext.contextData}>
        <h1>Credits</h1>
      </Layout>
    </ThemeProvider>
  );
}

export const pageQuery = graphql`
  query CreditsTplQuery($uid: String!) {
    essential: essentialsJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
    }
  }
`;
