const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        libraryTarget: 'commonjs2',
        library: 'ClipCCExtension',
        filename: 'clipcc-extension.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/
            })
        ]
    }
};
