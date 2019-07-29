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
    page: path.resolve(__dirname, 'theme/templates/PageTpl.js'),
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
      const { path, uid } = node.meta;
      createPage({
        component: uid.startsWith('page') ? tpls.page : tpls[uid],
        context: { uid: uid },
        path: path,
      });
    });
  });
};
