const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'templates'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const tpls = {
    chapter: path.resolve(__dirname, 'templates/ChapterTpl.js'),
    credits: path.resolve(__dirname, 'templates/CreditsTpl.js'),
    error: path.resolve(__dirname, 'templates/ErrorTpl.js'),
    home: path.resolve(__dirname, 'templates/HomeTpl.js'),
    listing: path.resolve(__dirname, 'templates/ListingTpl.js'),
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

  const toc = chapters.data.allChaptersJson.edges.map(el => el.node.meta);

  creators.forEach(creator => {
    const { edges } = creator.src.data[creator.gql];
    edges.forEach(({ node }) => {
      const { path, uid } = node.meta;
      createPage({
        component: creator.tpl ? creator.tpl : tpls[uid],
        context: { uid: uid, toc: toc },
        path: path,
      });
    });
  });
};
