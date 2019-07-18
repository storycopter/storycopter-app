import { graphql } from 'gatsby';
import React from 'react';

import { Headline } from "@storycopter/ui";

import Layout from 'components/Layout';

const HomeTpl = ({
  data: {
    pagesJson: { data },
  },
}) => {
  return (
    <Layout>
      <Headline cover title={data.intro} subtitle={data.intro} />
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
      data {
        intro
      }
    }
  }
`;
