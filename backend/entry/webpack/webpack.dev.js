const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { webpackConfig } = require('./webpack.common.js');

const resolve = (dir) => path.resolve(__dirname, dir);

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
];

const proxy = {
    '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
    },
};

const devServer = {
    mode: 'development',
    devtool: '#source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '../dist'),
        host: '127.0.0.1',
        port: 2333,
        hot: true,
        open: true,
        progress: false,
        quiet: true,
        overlay: {
            warning: true,
            errors: true,
        },
        proxy,
    },
    watchOptions: {
        ignored: [
            'node_modules',
            resolve('../../../frontend'),
            resolve('../../../covers'),
        ],
    },
    plugins,
};

module.exports = merge(webpackConfig, devServer);
