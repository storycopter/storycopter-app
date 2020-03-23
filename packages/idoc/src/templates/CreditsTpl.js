import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Layout from './partials/Layout';
import { docTheme } from '@storycopter/ui/src/themes';

class CreditsTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.group('CreditsTpl.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <ThemeProvider theme={docTheme}>
        <Layout
          contextData={this.props.pageContext.contextData}
          location={this.props.location}
          path={this.props.data.essential.meta.path}>
          <h1>Credits</h1>
          <p>Some text</p>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default CreditsTpl;

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
