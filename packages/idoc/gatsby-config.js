const path = require('path');

module.exports = {
  siteMetadata: {
    // siteUrl: config.site.url
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-json`,
      options: {},
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `templates`,
        path: `${__dirname}/templates/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `essentials`,
        path: `${__dirname}/pages/essentials/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `chapters`,
        path: `${__dirname}/pages/chapters/`,
      },
    },
  ],
};
