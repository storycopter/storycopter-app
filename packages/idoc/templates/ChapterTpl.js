import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { IdocProvider } from '@storycopter/ui/providers';
import { Layout } from '@storycopter/ui/partials';
import { componentMap } from '@storycopter/ui/components';

const ChapterTpl = (
  {
    data: {
      chaptersJson: { tree },
      allFile: { edges },
    },
  },
  props
) => {
  const { components } = tree;

  return (
    <Layout>
      {_.sortBy(components, [o => o.order]).map(component => {
        const merger = (propValues, constValues) => {
          if (_.isArray(propValues)) {
            return propValues.concat(constValues);
          }
        };

        // merge component.props.image object with actual graphql resolved image file
        const image = _.mergeWith(
          component.props.image,
          _.get(
            _.find(edges, o => o.node.childImageSharp.resize.originalName.startsWith(`${component.id}-image`)),
            'node.childImageSharp'
          )
        );

        // merge component.props.images array with actual graphql resolved image files
        const images = _.mergeWith(
          _.sortBy(component.props.images, [o => o.order]),
          _.sortBy(
            _.map(
              _.filter(edges, o => o.node.childImageSharp.resize.originalName.startsWith(`${component.id}-images`)),
              o => _.get(o, 'node.childImageSharp')
            ),
            [o => o.order]
          ),
          merger
        );

        const RenderedComponent = componentMap[component.type];
        return (
          <IdocProvider invert={component.invert} key={component.id}>
            <RenderedComponent
              {...component.props}
              image={component.props.image ? image : null}
              images={component.props.images ? images : null}
            />
          </IdocProvider>
        );
      })}
    </Layout>
  );
};

export default ChapterTpl;

export const pageQuery = graphql`
  query ChapterTplQuery($uid: String!) {
    chaptersJson(meta: { uid: { eq: $uid } }) {
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
            anchor
            animate
            cover
            image {
              name
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
    allFile(filter: { relativeDirectory: { eq: $uid } }) {
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
