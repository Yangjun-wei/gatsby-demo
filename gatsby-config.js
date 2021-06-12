module.exports = {
  siteMetadata: {
    title: `Gatsby Demo`,
    description: `大爷，来看一看啊`,
    author: ``,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "json",
        path: `${__dirname}/json/`,
      },
    },
    "gatsby-transformer-json",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-plugin-antd",
      options: {
        // style: true,
      },
    },
    "gatsby-plugin-less",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
