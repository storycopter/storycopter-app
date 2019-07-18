import { graphql } from 'gatsby';
import React from 'react';

// import { Headline } from "@storycopter/ui";

import Layout from 'components/Layout';

const ErrorTpl = ({
  data: {
    pagesJson: { data },
  },
}) => {
  return (
    <Layout>
      <h1>{data.intro}</h1>
    </Layout>
  );
};

export default ErrorTpl;

export const pageQuery = graphql`
  query ErrorTplQuery($uid: String!) {
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
