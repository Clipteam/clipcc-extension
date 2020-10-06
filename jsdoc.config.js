module.exports = {
    source: {
        include: ['src']
    },
    opts: {
        destination: 'docs',
        recurse: true,
        template: 'node_modules/jsdoc-baseline'
    },
    'templates.baseline': 'baseline.config.json5'
};
