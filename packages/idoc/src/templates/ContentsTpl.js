import React, { Component } from 'react';
import _ from 'lodash';

import Layout from './partials/Layout';

class ContentsTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;

    console.group('ContentsTpl.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Layout location={this.props.location} path={this.props.path}>
        <h1>Listing</h1>
        <p>Some text</p>
      </Layout>
    );
  }
}

export default ContentsTpl;
