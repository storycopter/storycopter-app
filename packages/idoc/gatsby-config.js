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
        name: `theme`,
        path: `${__dirname}/theme/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/public/static/`,
      },
    },
  ],
};
