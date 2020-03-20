import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { componentMap } from '@storycopter/ui/src/components';
import { docTheme } from '@storycopter/ui/src/themes';

import Layout from './partials/Layout';
import utilFill from './utils/utilFill';

const merger = (someValues, otherValues) => {
  if (_.isArray(someValues)) {
    return someValues.concat(otherValues);
  }
};

class ChapterTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data: {
        chapter: {
          tree: { components },
        },
        files: { edges },
      },
    } = this.props;

    // console.group('ChapterTpl.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <ThemeProvider theme={docTheme}>
        <Layout
          contextData={this.props.pageContext.contextData}
          location={this.props.location}
          path={this.props.data.chapter.meta.path}>
          {_.sortBy(components, [o => o.order]).map((component, i) => {
            const { props } = component;
            /*
            CHECK ALL GRAPHQL-ed PROPS
            - align?
            - animate?
            - cover?
            - subtitle?
            - text?
            - title?
            √ fill
            √ images
            √ mask
          */

            // consolidate props.fill.image w/ graphql-ed image data
            const fill = utilFill(component, props, edges);

            // consolidate props.images w/ graphql-ed image data
            const images =
              props.images.length > 0
                ? _.mergeWith(
                    _.sortBy(props.images, [o => o.order]),
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

            // dirty validate mask string values
            const mask = ['dark', 'light'].includes(props.mask) ? props.mask : null;

            const RenderedComponent = componentMap[component.type];

            return (
              <RenderedComponent
                {...props}
                fill={fill}
                id={component.id}
                images={images}
                key={component.id}
                mask={mask}
              />
            );
          })}
        </Layout>
      </ThemeProvider>
    );
  }
}

export default ChapterTpl;

export const pageQuery = graphql`
  query ChapterTplQuery($uid: String!) {
    chapter: chaptersJson(meta: { uid: { eq: $uid } }) {
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
            images {
              alt
              caption
              name
              order
            }
            mask
            subtitle
            text
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
