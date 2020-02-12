# gatsby-remark-extract-keywords

[![](https://img.shields.io/github/workflow/status/osiux/gatsby-remark-extract-keywords/Release)](https://github.com/osiux/gatsby-remark-extract-keywords/actions) [![](https://img.shields.io/bundlephobia/min/gatsby-remark-extract-keywords)](https://bundlephobia.com/result?p=gatsby-remark-extract-keywords) [![MIT License](https://img.shields.io/npm/l/gatsby-remark-extract-keywords)][https://github.com/osiux/gatsby-remark-extract-keywords/blob/master/license]

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Extract keywords and key-phrases from your content using [retext](https://github.com/retextjs/retext) and [retext-keywords](https://github.com/retextjs/retext-keywords) and use them for SEO or just display them.

Supports both _MD_ and _MDX_ format.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributors ✨](#contributors-)

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.osiux.ws/"><img src="https://avatars2.githubusercontent.com/u/204463?v=4" width="100px;" alt=""/><br /><sub><b>Eduardo Reveles</b></sub></a><br /><a href="https://github.com/osiux/gatsby-remark-extract-keywords/commits?author=osiux" title="Code">💻</a> <a href="https://github.com/osiux/gatsby-remark-extract-keywords/commits?author=osiux" title="Documentation">📖</a> <a href="#ideas-osiux" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
