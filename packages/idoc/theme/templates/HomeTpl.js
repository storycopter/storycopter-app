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
  const { branches, branchIds } = tree;
  return (
    <Layout>
      {branches.map(branch => {
        const Component = map[branch.type];
        return <Component key={branch.id} {...branch.data} />;
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
        branches {
          component
          data {
            subtitle
            title
            cover
          }
          id
          order
          type
        }
        branchIds
      }
    }
  }
`;
