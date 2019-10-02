import React, { Component } from 'react';
import _ from 'lodash';

import Layout from './partials/Layout';

class CreditsTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;

    // console.group('CreditsTpl.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <Layout isCredits>
        <h1>Credits</h1>
        <p>Some text</p>
      </Layout>
    );
  }
}

export default CreditsTpl;
