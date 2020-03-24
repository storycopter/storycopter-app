const path = require('path');
const _ = require('lodash');

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
    page: path.resolve(__dirname, 'src/templates/PageTpl.js'),
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
              path
              title
              uid
            }
          }
        }
      }
    }
  `);
  const allPages = await graphql(`
    {
      allPagesJson(sort: { fields: meta___order }) {
        edges {
          node {
            meta {
              coverEnabled
              coverImage {
                name
              }
              order
              path
              summary
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
              coverEnabled
              coverImage {
                name
              }
              publisher
              summary
              title
            }
            brand {
              backgColor
              brandColor
              faviconEnabled
              logoEnabled
              favicon {
                name
              }
              logo {
                name
              }
              textColor
              typography
            }
            motivation {
              enabled
              label
              link
            }
            sound {
              enabled
              track {
                name
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
      gql: 'allPagesJson',
      src: allPages,
      tpl: tpls.page,
    },
  ];

  creators.forEach(creator => {
    const { edges } = creator.src.data[creator.gql];
    edges.forEach(({ node }) => {
      const { path, uid } = node.meta;

      // skip the dummy pages (used to sanitise Gatsby’s graphql queries)
      const dummyPages = ['essentialsDummy', 'pagesDummy'];
      if (dummyPages.includes(uid)) return null;
      const pages = _.filter(allPages.data.allPagesJson.edges, function(o) {
        if (!dummyPages.includes(o.node.meta.uid)) return o.node.meta;
      });
      const essentials = _.filter(allEssentials.data.allEssentialsJson.edges, function(o) {
        if (!dummyPages.includes(o.node.meta.uid)) return o.node.meta;
      });

      createPage({
        component: creator.tpl ? creator.tpl : tpls[uid],
        context: {
          uid: uid,
          contextData: {
            allPages: pages.map(page => page.node.meta),
            allEssentials: essentials.map(page => page.node.meta),
            allSiteData: allSiteData.data.allSiteJson.edges[0].node,
          },
        },
        path: path,
      });
    });
  });
};
