const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Netlify CMS / Stripe / TailwindCSS`,
    description: `Headless Stripe Store with Gatsby & Netlify CMS`,
    siteUrl: process.env.SITE_URL,
    author: ``,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        name: "uploads",
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/img`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      // provides configuration and icons to the phone.
      // Auto icon generation
      // Favicon support
      // Legacy icon support (iOS)
      // Cache busting
      // Localization - Provides unique manifests for path-based localization
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/img/logo-square.png`,
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Product", "Sku"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
        auth: false,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      // https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: [
          "/terms",
          "/privacy",
          "/refund",
          "/shop/thanks",
          "/contact/thanks",
        ],
      },
    },
    "gatsby-plugin-netlify-cache",
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],

  developMiddleware: (app) => {
    app.use(
      "/.netlify/functions/",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "/",
        },
      })
    );
  },
};
