/*!
 * @author claude
 * date 07/05/2019
 * webpack 生产配置
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { webpackConfig } = require('./webpack.common');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = merge(webpackConfig, {
    mode:    'production',
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!**/lib/**'],
        }),
        new webpack.HashedModuleIdsPlugin(), // 强制缓存
        new CopyPlugin([
            { from: resolve('../src/components/Tinymce/skins'), to: resolve('../../dist/frontend/tinymce/skins') },
            { from: resolve('../src/components/Tinymce/themes'), to: resolve('../../dist/frontend/tinymce/themes') },
            { from: resolve('../src/components/Tinymce/zh_CN.js'), to: resolve('../../dist/frontend/tinymce') },
        ]),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserJSPlugin({
                terserOptions: {
                    warnings: false,
                    output:   {
                        comments: false,
                    },
                    compress: {
                        drop_console:  true,
                        drop_debugger: true,
                    },
                },
                sourceMap: false,
                parallel:  true,
            }),
        ],
    },
});
