# gatsby-remark-extract-keywords

[![](https://img.shields.io/github/workflow/status/osiux/gatsby-remark-extract-keywords/Release)](https://github.com/osiux/gatsby-remark-extract-keywords/actions) [![](https://img.shields.io/bundlephobia/min/gatsby-remark-extract-keywords)](https://bundlephobia.com/result?p=gatsby-remark-extract-keywords) [![MIT License](https://img.shields.io/npm/l/gatsby-remark-extract-keywords)](https://github.com/osiux/gatsby-remark-extract-keywords/blob/master/license)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Extract most important keywords from your content using [Natural tf-idf](https://github.com/NaturalNode/natural#tf-idf). From their docs:

> Term Frequency–Inverse Document Frequency (tf-idf) is implemented to determine how important a word (or words) is to a document relative to a corpus. The following formulas are used for calculating tf and idf:
>
> -   tf(t, d) is a so-called raw count, so just the count of the term in the document
> -   idf(t, D) uses the following formula: 1 + ln(N / (1 + n\*t)) where N is the number of documents, and n_t the number of documents in which the term appears. The 1 + in the denominator is for handling the possibility that n_t is 0.

In our context, `N` is just 1, your page/post content.

Supports both **MD** and **MDX** format.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Usage](#usage)
    -   [`blacklist` option as function](#blacklist-option-as-function)
-   [Options](#options)
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

This creates a new field on each MD/MDX node called `keywords`, you can use it on your GraphQL query:

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
        }
      }
    }
  }
}
```

### `blacklist` option as function

This will only return keywords with keyword length higher than 5.

```javascript
const filterKeywords = term => term.length > 5;

plugins: [
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                {
                    resolve: `gatsby-remark-extract-keywords`,
                    options: {
                        blacklist: filterKeywords,
                    },
                },
            ],
        },
    },
];
```

## Options

| Option      | Description                                                                                                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `max`       | Maximum number of keywords to return                                                                                                                                                                |
| `blacklist` | String, array of strings or function to blacklist terms. If function, is used as [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) parameter. |

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
