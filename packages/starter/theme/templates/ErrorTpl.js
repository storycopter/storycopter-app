import { graphql } from 'gatsby';
import React from 'react';

const ErrorTpl = ({
  data: {
    pagesJson: { data },
  },
}) => {
  return (
    <div>
      <h1>{data.intro}</h1>
    </div>
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
