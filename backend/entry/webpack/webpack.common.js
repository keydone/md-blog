const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 命令行/环境变量
const webpackEnv = require('./utils/env-analyzer');

const {
    devMode,
    excludes,
} = webpackEnv;

const resolve = (dir) => path.resolve(__dirname, dir);

const plugins = [];

// 添加分析插件
if (webpackEnv.envParams.analyzer !== undefined) {
    plugins.push(new WebpackBundleAnalyzer());
}

// Dashboard 插件
if (webpackEnv.envParams.log !== undefined) {
    const Dashboard = require('webpack-dashboard');
    const DashboardPlugin = require('webpack-dashboard/plugin');
    const dashboard = new Dashboard();

    plugins.push(new DashboardPlugin(dashboard.setData));
}

const webpackConfig = {
    mode: 'development',
    entry: resolve('../public/app/app.js'),
    output: {
        filename: `js/[name].[${devMode ? 'hash' : 'chunkhash'}].js`,
        chunkFilename: `js/[name].[${devMode ? 'hash' : 'chunkhash'}].js`,
        path: resolve('../../../dist/backend'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            '@': resolve('../../../'),
            '@bsrc': resolve('../public'),
            '@bassets': resolve('../public/assets'),
            '@bcomp': resolve('../public/components'),
            '@bjs': resolve('../public/assets/js'),
            '@bstyles': resolve('../public/assets/styles'),
            '@bmodules': resolve('../public/assets/modules'),
            '@bviews': resolve('../public/views'),
        },
    },
    module: {
        rules: [{
            test: /\.(sc|c)ss$/,
            use: devMode ? [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            resolve('../public/assets/styles/_variable.scss'),
                        ],
                    },
                },
            ] : [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                resolve('../public/assets/styles/_variable.scss'),
                            ],
                        },
                    },
                ],
            exclude: [
                /node_modules/,
                ...excludes,
            ],
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: [
                /node_modules/,
                ...excludes,
            ],
        }, {
            test: /\.(png|jpe?g|svg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,    // 8k
                    name: 'images/[name].[hash:7].[ext]',
                },
            }],
            exclude: [
                ...excludes,
            ],
        }, {
            test: /\.(eot|woff|woff2|ttf)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,    // 8k
                    name: 'fonts/[name].[hash:7].[ext]',
                },
            }],
            exclude: [
                ...excludes,
            ],
        }, {
            test: /element-ui\/.*?js$/,
            loader: 'babel-loader',
            exclude: [
                /node_modules/,
                ...excludes,
            ],
        }, {
            test: /element-ui\/.*?css$/,
            loader: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: devMode,
                },
            },
                'css-loader',
            ],
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: [
                /node_modules/,
                ...excludes,
            ],
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: resolve('../public/template/index.ejs'),
            favicon: resolve('../public/assets/images/x-logo.png'),
            inject: true,
        }),
        new FriendlyErrorsPlugin(),
        new ManifestPlugin(),
        ...plugins,
    ],
    optimization: {
        splitChunks: {
            name: true,
            chunks: 'all',
            minChunks: 2,
            maxInitialRequests: 3,
            cacheGroups: {
                // 提取node_modules依赖包
                vendors: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2,
                },
            },
        },
    },
};

module.exports = {
    webpackConfig,
    webpackEnv,
};
