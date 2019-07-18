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
      allPagesJson {
        edges {
          node {
            meta {
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
    const { edges } = creator.src.data.allPagesJson;
    edges.forEach(({ node }) => {
      createPage({
        component: tpls[node.meta.uid],
        context: { uid: node.meta.uid },
        path: node.meta.path,
      });
    });
  });
};
