import React, { Component } from 'react';
import _ from 'lodash';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { docTheme } from '@storycopter/ui/src/themes';
import Layout from './partials/Layout';

class ErrorTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;

    console.group('ErrorTpl.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <ThemeProvider theme={docTheme}>
        <Layout contextData={this.props.pageContext.contextData} location={this.props.location} path={this.props.path}>
          <h1>Error</h1>
          <p>Some text</p>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default ErrorTpl;
