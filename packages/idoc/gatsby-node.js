const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src/templates'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const tpls = {
    chapter: path.resolve(__dirname, 'src/templates/ChapterTpl.js'),
    credits: path.resolve(__dirname, 'src/templates/CreditsTpl.js'),
    error: path.resolve(__dirname, 'src/templates/ErrorTpl.js'),
    home: path.resolve(__dirname, 'src/templates/HomeTpl.js'),
    listing: path.resolve(__dirname, 'src/templates/ListingTpl.js'),
  };

  const essentials = await graphql(`
    {
      allEssentialsJson {
        edges {
          node {
            meta {
              path
              uid
            }
          }
        }
      }
    }
  `);
  const chapters = await graphql(`
    {
      allChaptersJson {
        edges {
          node {
            meta {
              cover {
                name
              }
              order
              path
              title
              uid
            }
          }
        }
      }
    }
  `);

  const creators = [
    {
      gql: 'allEssentialsJson',
      src: essentials,
    },
    {
      gql: 'allChaptersJson',
      src: chapters,
      tpl: tpls.chapter,
    },
  ];

  creators.forEach(creator => {
    const { edges } = creator.src.data[creator.gql];
    edges.forEach(({ node }) => {
      const { path, uid } = node.meta;
      createPage({
        component: creator.tpl ? creator.tpl : tpls[uid],
        context: { uid: uid },
        path: path,
      });
    });
  });
};
