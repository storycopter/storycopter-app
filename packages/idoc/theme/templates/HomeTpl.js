import { graphql } from 'gatsby';
import React from 'react';
import { sortBy } from 'lodash';

import { Layout } from '@storycopter/ui/partials';
import { SCThemeProvider } from '@storycopter/ui/providers';
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
      {sortBy(components, [o => o.order]).map(component => {
        console.group('Component');
        console.log(component);
        console.groupEnd();
        const RenderedComponent = map[component.type];
        return (
          <SCThemeProvider invert={component.options.invert} key={component.id}>
            <RenderedComponent {...component.options} />
          </SCThemeProvider>
        );
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
  }
`;
