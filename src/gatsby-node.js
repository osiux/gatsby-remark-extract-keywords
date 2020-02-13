const natural = require('natural');
const TfIdf = natural.TfIdf;

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

    const tfidf = new TfIdf();
    tfidf.addDocument(text);

    tfidf.listTerms(0).forEach(item => textKeywords.push(item.term));

    if (blacklist) {
        textKeywords = blacklistKeywords(textKeywords, blacklist);
    }

    if (max) {
        textKeywords = textKeywords.slice(0, max);
    }

    return textKeywords;
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

        const keywords = getKeywords({
            text: bodyText,
            max,
            blacklist,
        });

        createNodeField({
            node,
            name: `keywords`,
            value: keywords,
        });
    }
};
