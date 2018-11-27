const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// happypack
/* const os = require('os');
const HappyPack = require('happypack');
const friendlyFormat = require('eslint-friendly-formatter');
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
}); */
const { webpackConfig } = require('./webpack.common');

module.exports = merge(webpackConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(), // 强制缓存
        /* new HappyPack({
            id: 'babel',
            threads: 4,
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: 'css',
            threads: 4,
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'css-loader',
                options: {
                    minimize: true,
                    sourceMap: false,
                }
            }],
        }),
        new HappyPack({
            id: 'eslint',
            threads: 4,
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'eslint-loader',
                options: {
                    formatter: friendlyFormat,
                    emitWarning: true,
                }
            }],
        }), */
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserJSPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
                sourceMap: false,
                parallel: true,
            }),
        ],
    },
});
