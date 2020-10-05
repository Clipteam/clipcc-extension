module.exports = {
    plugins: [
        'plugins/markdown',
        'plugins/summarize'
    ],
    source: {
        include: ['src']
    },
    opts: {
        'destination': 'docs',
        'recurse': true,
    }
};
