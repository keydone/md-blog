/*!
 * @author claude
 * date 07/05/2019
 * 公共 webpack 配置
 */

const path = require('path');
const webpack = require('webpack');
const shelljs = require('shelljs');
const { existsSync } = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const resolve = dir => path.resolve(__dirname, dir);
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dllLib = '../../dist/frontend/lib/vendor-manifest.json';
const dllExists = existsSync(resolve(dllLib));

// 如果 dll 库不存在, 就自动生成
if (!dllExists) {
    const command = `webpack -p --progress --config ${resolve('./webpack.dll.js')}`;

    shelljs.exec(command);
}

// 命令行/环境变量
const webpackEnv = require('./utils/env-analyzer');

const {
    devMode,
    excludes,
} = webpackEnv;

const plugins = [];
const dllManifest = require(dllLib);

// 添加分析插件
if (webpackEnv.envParams.report !== undefined) {
    plugins.push(new BundleAnalyzerPlugin());
}

// Dashboard 插件
if (webpackEnv.envParams.log !== undefined) {
    const Dashboard = require('webpack-dashboard');
    const DashboardPlugin = require('webpack-dashboard/plugin');
    const dashboard = new Dashboard();

    plugins.push(new DashboardPlugin(dashboard.setData));
}

if (!devMode) {
    plugins.push(
        new HtmlWebpackTagsPlugin({
            publicPath: '/lib/',
            tags:       [`${dllManifest.name}.js`],
            append:     false,
        }),
        new webpack.DllReferencePlugin({
            manifest: dllManifest,
        })
    );
}
const cssloaders = [
    'css-loader',
    'postcss-loader',
    {
        loader:  'sass-loader',
        options: {
            implementation: require('dart-sass'),
        },
    },
    {
        loader:  'sass-resources-loader',
        options: {
            resources: [
                resolve('../src/assets/styles/_variable.scss'),
            ],
        },
    },
];

const webpackConfig = {
    mode:   'development',
    entry:  resolve('../src/app/entry.js'),
    output: {
        filename:      `js/[name].[${devMode ? 'hash' : 'chunkhash'}:7].js`,
        chunkFilename: `js/[name].[${devMode ? 'hash' : 'chunkhash'}:7].js`,
        path:          resolve('../../dist/frontend'),
        publicPath:    '/',
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias:      {
            '@':       resolve('../../'),
            '@src':    resolve('../src'),
            '@assets': resolve('../src/assets'),
            '@comp':   resolve('../src/components'),
            '@js':     resolve('../src/assets/js'),
            '@styles': resolve('../src/assets/styles'),
            // '@modules': resolve('../src/assets/modules'),
            '@views':  resolve('../src/views'),
        },
    },
    module: {
        rules: [{
            test: /\.(sc|c)ss$/,
            use:  devMode ? [
                'style-loader',
                ...cssloaders,
            ] : [
                'style-loader',
                { loader: MiniCssExtractPlugin.loader },
                ...cssloaders,
            ],
            exclude: [
                ///node_modules/,
                ...excludes,
            ],
        }, {
            test:    /\.js$/,
            use:     ['cache-loader', 'babel-loader'],
            exclude: [
                /node_modules/,
                ...excludes,
            ],
        }, {
            test: /\.(png|jpe?g|svg|gif)$/i,
            use:  [{
                loader:  'url-loader',
                options: {
                    limit: 8192,    // 8k
                    name:  'images/[name].[hash:7].[ext]',
                },
            }],
            exclude: [
                ...excludes,
            ],
        }, {
            test: /\.(eot|woff|woff2|ttf)$/i,
            use:  [{
                loader:  'url-loader',
                options: {
                    limit: 8192,    // 8k
                    name:  'fonts/[name].[hash:7].[ext]',
                },
            }],
            exclude: [
                ...excludes,
            ],
        }, {
            test:    /element-ui\/.*?js$/,
            loader:  ['cache-loader', 'babel-loader'],
            exclude: [
                /node_modules/,
                ...excludes,
            ],
        }, {
            test:   /element-ui\/.*?css$/,
            loader: [{
                loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            ],
        }, {
            test:    /\.vue$/,
            loader:  'vue-loader',
            exclude: [
                /node_modules/,
                ...excludes,
            ],
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:      'css/[name].[hash:7].css',
            chunkFilename: 'css/[id].[hash:7].css',
        }),
        new HtmlWebpackPlugin({
            template: resolve('../src/template/index.ejs'),
            favicon:  resolve('../src/assets/images/logo.png'),
            minify:   {
                removeComments:        true,
                collapseWhitespace:    true,
                removeAttributeQuotes: true,
            },
            chunksSortMode: 'dependency',
            inject:         true,
        }),
        new FriendlyErrorsPlugin(),
        new ManifestPlugin(),
        ...plugins,
    ],
    optimization: {
        splitChunks: {
            name:               true,
            chunks:             'async',
            minChunks:          2,
            maxInitialRequests: 6,
            /* cacheGroups: {
                // 提取node_modules依赖包
                vendors: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2,
                },
            }, */
        },
    },
};

module.exports = {
    webpackConfig,
    webpackEnv,
};
