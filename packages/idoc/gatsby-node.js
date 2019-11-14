const path = require('path');

exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    };
  }
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
    contents: path.resolve(__dirname, 'src/templates/ContentsTpl.js'),
    credits: path.resolve(__dirname, 'src/templates/CreditsTpl.js'),
    error: path.resolve(__dirname, 'src/templates/ErrorTpl.js'),
    home: path.resolve(__dirname, 'src/templates/HomeTpl.js'),
  };

  const allEssentials = await graphql(`
    {
      allEssentialsJson {
        edges {
          node {
            meta {
              cover {
                name
              }
              path
              text
              title
              uid
            }
          }
        }
      }
    }
  `);
  const allChapters = await graphql(`
    {
      allChaptersJson(sort: { fields: meta___order }) {
        edges {
          node {
            meta {
              cover {
                name
              }
              order
              path
              text
              title
              uid
            }
          }
        }
      }
    }
  `);

  const allSiteData = await graphql(`
    {
      allSiteJson {
        edges {
          node {
            meta {
              title
              publisher
            }
            settings {
              assets {
                brandmark
                favicon
              }
              palette {
                accent
                background
                main
              }
              typography {
                variant
              }
            }
          }
        }
      }
    }
  `);

  const creators = [
    {
      gql: 'allEssentialsJson',
      src: allEssentials,
    },
    {
      gql: 'allChaptersJson',
      src: allChapters,
      tpl: tpls.chapter,
    },
  ];

  creators.forEach(creator => {
    const { edges } = creator.src.data[creator.gql];
    edges.forEach(({ node }) => {
      const { path, uid } = node.meta;
      createPage({
        component: creator.tpl ? creator.tpl : tpls[uid],
        context: {
          uid: uid,
          contextData: {
            allChapters: allChapters.data.allChaptersJson.edges.map(el => el.node.meta),
            allEssentials: allEssentials.data.allEssentialsJson.edges.map(el => el.node.meta),
            allSiteData: allSiteData.data.allSiteJson.edges[0].node,
          },
        },
        path: path,
      });
    });
  });
};
