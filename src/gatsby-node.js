/* eslint-disable */
const retext = require('retext');
const pos = require('retext-pos');
const keywords = require('retext-keywords');
const toString = require('nlcst-to-string');

const blacklistKeywords = (keywords, blacklist) => {
    if (typeof blacklist === 'function') {
        return keywords.filter(blacklist);
    }

    // Make all blacklisted terms lowercase
    let blacklisted = [...blacklist].map(term => term.toLowerCase());

    // Then compare with actual keywords as lowercase
    return keywords.filter(term => !blacklisted.includes(term.toLowerCase()));
};

const getKeywords = ({ text, max, blacklist }) => {
    let textKeywords = [];
    let textKeyphrases = [];

    retext()
        .use(pos)
        .use(keywords)
        .process(text, (err, file) => {
            if (err) throw err;

            file.data.keywords.forEach(kw => {
                textKeywords.push(toString(kw.matches[0].node));
            });

            file.data.keyphrases.forEach(phrase => {
                textKeyphrases.push(
                    phrase.matches[0].nodes.map(toString).join('')
                );
            });
        });

    if (blacklist) {
        textKeywords = blacklistKeywords(textKeywords, blacklist);
        textKeyphrases = blacklistKeywords(textKeyphrases, blacklist);
    }

    if (max) {
        textKeywords = textKeywords.slice(0, max);
        textKeyphrases = textKeyphrases.slice(0, max);
    }

    return [textKeywords, textKeyphrases];
};

exports.onCreateNode = ({ node, actions }, { max, blacklist } = {}) => {
    const { createNodeField } = actions;

    if (
        node.internal.type === `MarkdownRemark` ||
        node.internal.type === `Mdx`
    ) {
        const bodyText =
            node.internal.type === `MarkdownRemark`
                ? node.rawMarkdownBody
                : node.rawBody;

        const [keywords, keyphrases] = getKeywords({
            text: bodyText,
            max,
            blacklist,
        });

        createNodeField({
            node,
            name: `keywords`,
            value: keywords,
        });
        createNodeField({
            node,
            name: `keyphrases`,
            value: keyphrases,
        });
    }
};
