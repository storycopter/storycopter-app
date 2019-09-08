const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'theme'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const tpls = {
    home: path.resolve(__dirname, 'theme/templates/HomeTpl.js'),
    error: path.resolve(__dirname, 'theme/templates/ErrorTpl.js'),
  };

  const pages = await graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/pages/.*.md/" } }) {
        edges {
          node {
            frontmatter {
              uid
              path
            }
          }
        }
      }
    }
  `);

  /* List creators */
  const creators = [
    {
      src: pages,
    },
  ];

  creators.forEach(creator => {
    const { edges } = creator.src.data.allMarkdownRemark;
    edges.forEach(({ node }) => {
      createPage({
        component: tpls[node.frontmatter.uid],
        context: { uid: node.frontmatter.uid },
        path: node.frontmatter.path,
      });
    });
  });
};
