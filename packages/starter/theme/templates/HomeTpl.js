import { graphql } from 'gatsby';
import React from 'react';

const HomeTpl = ({
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
