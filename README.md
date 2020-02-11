# gatsby-remark-extract-keywords

Extract keywords and key-phrases from your content using [retext](https://github.com/retextjs/retext) and [retext-keywords](https://github.com/retextjs/retext-keywords) and use them for SEO or just display them.

Supports both _MD_ and _MDX_ format.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Usage](#usage)
-   [How to run tests](#how-to-run-tests)
-   [How to develop locally](#how-to-develop-locally)
-   [How to contribute](#how-to-contribute)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

`npm install --save gatsby-remark-extract-keywords`

or

`yarn add gatsby-remark-extract-keywords`

It has [gatsby](https://github.com/gatsbyjs/gatsby) as `peerDependency`.

## Usage

In your `gatsby-config.js`:

```javascript
plugins: [
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [`gatsby-remark-extract-keywords`],
        },
    },
];
```

This creates two new fields on each MD/MDX nodes called `keywords` and `keyphrases`, you can use them on your GraphQL query:

```javascript
query ListingQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          title
        }
        fields {
          keywords
          keyphrases
        }
      }
    }
  }
}
```
