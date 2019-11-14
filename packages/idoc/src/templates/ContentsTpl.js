import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import Layout from './partials/Layout';

class ContentsTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.group('ContentsTpl.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Layout
        contextData={this.props.pageContext.contextData}
        location={this.props.location}
        path={this.props.data.essential.meta.path}>
        <h1>Contents</h1>
        <p>Some text</p>
      </Layout>
    );
  }
}

export default ContentsTpl;

export const pageQuery = graphql`
  query ContentsTplQuery($uid: String!) {
    essential: essentialsJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      tree {
        components {
          id
          invert
          order
          type
          props {
            align
            animate
            cover
            fill {
              image
              color
            }
            mask
            subtitle
            text
            title
          }
        }
      }
    }
    covers: allFile(filter: { name: { eq: "cover" } }) {
      edges {
        node {
          childImageSharp {
            horizontal: fluid(maxWidth: 600, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            squarishFluidThumb: fluid(maxWidth: 400, maxHeight: 320, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            verticalFluidThumb: fluid(maxWidth: 300, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            horizontalFluidThumb: fluid(maxWidth: 600, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            smallFixedThumb: fixed(width: 160, height: 80, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
          relativePath
        }
      }
    }
  }
`;
