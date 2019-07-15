import { graphql } from 'gatsby';
import React from 'react';

import Layout from 'components/Layout';

const HomeTpl = ({
  data: {
    markdownRemark: { frontmatter }
  }
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

export default HomeTpl;

export const pageQuery = graphql`
  query HomeTplQuery($uid: String!) {
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
