import React, { Component } from 'react';
import _ from 'lodash';

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
      <Layout>
        <h1>Error</h1>
        <p>Some text</p>
      </Layout>
    );
  }
}

export default ErrorTpl;
