import { graphql } from 'gatsby';
import React from 'react';
import { sortBy, find } from 'lodash';

import { IdocProvider } from '@storycopter/ui/providers';
import { Layout } from '@storycopter/ui/partials';
import { map } from '@storycopter/ui/components';

const PageTpl = (
  {
    data: {
      pagesJson: { tree },
      allFile: { edges },
    },
  },
  props
) => {
  const { components } = tree;
  console.group('PageTpl.js');
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
          <IdocProvider invert={component.options.invert} key={component.id}>
            <RenderedComponent
              {...component.options}
              fill={fill ? fill.node.childImageSharp.resize.src : null}
            />
          </IdocProvider>
        );
      })}
    </Layout>
  );
};

export default PageTpl;

export const pageQuery = graphql`
  query PageTplQuery($uid: String!) {
    pagesJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      tree {
        components {
          id
          options {
            align
            anchor
            animate
            cover
            fill
            invert
            mask
            subtitle
            text
            title
          }
          order
          type
        }
        componentIds
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
