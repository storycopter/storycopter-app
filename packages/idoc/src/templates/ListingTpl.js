import React, { Component } from 'react';
import _ from 'lodash';

import Layout from './partials/Layout';

class ListingTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      pageContext: { toc },
    } = this.props;

    console.group('ListingTpl.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Layout toc={toc}>
        <h1>Listing</h1>
        <p>Some text</p>
      </Layout>
    );
  }
}

export default ListingTpl;
