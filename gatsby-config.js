const queries = require("./src/helpers/algolia-queries");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Loidolt Design`,
    description: `I like learning and creating. I strongly believe the world needs more of that.`,
    copyrights: "Loidolt Design 2021",
    author: `Chris Loidolt`,
    siteUrl: `https://loidolt.design`,
    postsPerPage: 12,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.xml",
      },
    },
    "gatsby-plugin-robots-txt",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-77424366-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "loidolt.design",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `loidolt-design`,
        short_name: `loidolt-design`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#212121`,
        display: `minimal-ui`,
        icon: `src/images/CLLightBulbBlue.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order
      // - Add the plugin
      options: {
        stylesProvider: {
          injectFirst: true,
        },
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Inter`,
                variants: [`300`, `400`, `500`, "700"],
              },
            ],
          },
        },
      },
    },
    "gatsby-plugin-styled-components",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
