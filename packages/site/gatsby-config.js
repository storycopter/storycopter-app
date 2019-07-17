const path = require('path');

// const config = path.resolve("settings/config.js");
// const secrets = path.resolve("settings/secrets.js");

module.exports = {
  siteMetadata: {
    // siteUrl: config.site.url
  },
  plugins: [
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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
  ],
};
