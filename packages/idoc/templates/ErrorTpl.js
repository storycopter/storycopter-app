import React, { Component } from 'react';
import _ from 'lodash';

import { Layout } from '@storycopter/ui/partials';

class ErrorTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      pageContext: { toc },
    } = this.props;

    console.group('ErrorTpl.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Layout toc={toc}>
        <h1>Error</h1>
        <p>Some text</p>
      </Layout>
    );
  }
}

export default ErrorTpl;
