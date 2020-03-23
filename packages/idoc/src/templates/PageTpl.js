import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { componentMap } from '@storycopter/ui/src/components';
import { docTheme } from '@storycopter/ui/src/themes';

import Layout from './partials/Layout';
import consolidateBackgImage from './utils/consolidateBackgImage';

const merger = (someValues, otherValues) => {
  if (_.isArray(someValues)) {
    return someValues.concat(otherValues);
  }
};

class PageTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data: {
        page: {
          tree: { components },
        },
        files: { edges },
      },
    } = this.props;

    // console.group('PageTpl.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <ThemeProvider theme={docTheme}>
        <Layout
          contextData={this.props.pageContext.contextData}
          location={this.props.location}
          path={this.props.data.page.meta.path}>
          {_.sortBy(components, [o => o.order]).map((component, i) => {
            const { settings } = component;

            // consolidate settings.backgImage w/ graphql-ed image data
            const backgImage = consolidateBackgImage(component, settings, edges);

            // consolidate settings.images w/ graphql-ed image data
            const images =
              settings.images && settings.images.length > 0
                ? _.mergeWith(
                    _.sortBy(settings.images, [o => o.order]),
                    _.sortBy(
                      _.map(
                        _.filter(edges, o =>
                          o.node.childImageSharp.resize.originalName.startsWith(`${component.id}-images`)
                        ),
                        o => _.get(o, 'node.childImageSharp')
                      ),
                      [o => o.order]
                    ),
                    merger
                  )
                : null;

            const RenderedComponent = componentMap[component.type];

            return (
              <RenderedComponent
                {...settings}
                backgImage={backgImage}
                id={component.id}
                images={images}
                key={component.id}
              />
            );
          })}
        </Layout>
      </ThemeProvider>
    );
  }
}

export default PageTpl;

export const pageQuery = graphql`
  query PageTplQuery($uid: String!) {
    page: pagesJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      tree {
        components {
          id
          order
          type
          settings {
            align
            backgColor
            backgImage
            cover
            images {
              alt
              caption
              name
              order
            }
            maskColor
            subtitle
            text
            textColor
            title
          }
        }
      }
    }
    files: allFile(filter: { relativeDirectory: { eq: $uid } }) {
      edges {
        node {
          childImageSharp {
            resize(quality: 95, width: 1400) {
              originalName
              src
            }
            fluid(maxWidth: 2000, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1400, height: 900, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
