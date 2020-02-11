const retext = require('retext');
const pos = require('retext-pos');
const keywords = require('retext-keywords');
const toString = require('nlcst-to-string');

const getKeywords = text => {
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

    return [textKeywords, textKeyphrases];
};

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;

    if (
        node.internal.type === `MarkdownRemark` ||
        node.internal.type === `Mdx`
    ) {
        const bodyText =
            node.internal.type === `MarkdownRemark`
                ? node.rawMarkdownBody
                : node.rawBody;

        const [keywords, keyphrases] = getKeywords(bodyText);

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
