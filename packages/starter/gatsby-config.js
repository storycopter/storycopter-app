const path = require('path');

module.exports = {
  siteMetadata: {
    // siteUrl: config.site.url
  },
  plugins: [
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
  ],
};
