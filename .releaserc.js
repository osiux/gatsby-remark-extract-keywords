module.exports = {
    branches: ["master"],
    plugins: [
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md'],
            },
        ],
    ],
};
