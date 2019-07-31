import { graphql } from 'gatsby';
import React from 'react';
import { sortBy, find } from 'lodash';

import { IdocProvider } from '@storycopter/ui/providers';
import { Layout } from '@storycopter/ui/partials';
import { map } from '@storycopter/ui/components';

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
  console.group('ChapterTpl.js');
  console.log(edges);
  console.log(edges);
  console.groupEnd();

  // const fill = filter(edges, o => {
  //   o.node.childImageSharp.resize.originalName.startsWith(
  //     `${component.id}-fill`
  //   );
  // });
  // console.log({ fill });
  return (
    <Layout>
      {sortBy(components, [o => o.order]).map(component => {
        // console.group('Component');
        // console.log(component);
        // console.groupEnd();

        const fill = find(edges, o =>
          o.node.childImageSharp.resize.originalName.startsWith(
            `${component.id}-fill`
          )
        );

        const RenderedComponent = map[component.type];
        return (
          <IdocProvider invert={component.invert} key={component.id}>
            <RenderedComponent
              {...component.props}
              fill={fill ? fill.node.childImageSharp.resize.src : null}
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
            fill
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
            resize(quality: 100, width: 2000) {
              originalName
              src
            }
          }
        }
      }
    }
  }
`;
