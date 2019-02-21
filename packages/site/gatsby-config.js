module.exports = {
  siteMetadata: {
    siteUrl: `https://storycopter.com`
  },
  plugins: [
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Lato:400,700`]
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    }
  ]
};
