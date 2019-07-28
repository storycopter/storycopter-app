import { graphql } from 'gatsby';
import React from 'react';

import { Layout } from '@storycopter/ui/partials';
import { map } from '@storycopter/ui/components';

const HomeTpl = (
  {
    data: {
      pagesJson: { tree },
    },
  },
  props
) => {
  const { components } = tree;
  return (
    <Layout>
      {components.map(component => {
        // console.group('Component');
        // console.log(component);
        // console.groupEnd();
        const RenderedComponent = map[component.type];
        return <RenderedComponent key={component.id} {...component.data} />;
      })}
    </Layout>
  );
};

export default HomeTpl;

export const pageQuery = graphql`
  query HomeTplQuery($uid: String!) {
    pagesJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      tree {
        components {
          component
          data {
            align
            animate
            cover
            subtitle
            title
          }
          id
          order
          type
        }
        componentIds
      }
    }
  }
`;
