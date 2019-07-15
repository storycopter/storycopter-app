import { graphql } from 'gatsby';
import React from 'react';

import Layout from 'components/Layout';

const ErrorTpl = ({
  data: {
    markdownRemark: { frontmatter },
  },
}) => {
  return (
    <Layout>
      <h1>{frontmatter.intro}</h1>
      <p>{frontmatter.intro_head}</p>
      <p>{frontmatter.intro_body}</p>
      <a>{frontmatter.intro_cta1}</a>
      <a>{frontmatter.intro_cta2}</a>
    </Layout>
  );
};

export default ErrorTpl;

export const pageQuery = graphql`
  query ErrorTplQuery($uid: String!) {
    markdownRemark(frontmatter: { uid: { eq: $uid } }) {
      html
      frontmatter {
        title
        intro
        intro_head
        intro_body
        intro_cta1
        intro_cta2
      }
    }
  }
`;
