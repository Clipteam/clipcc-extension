const path = require('path');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
            new UglifyEsPlugin()
        ]
    },
    plugins: [
        new CopyPlugin([{
            from: path.join(__dirname, 'src/index.d.ts'),
            to: path.join(__dirname, 'dist/clipcc-extension.d.ts')
        }])
    ]
};
