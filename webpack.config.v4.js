const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    /* watch: true,
    watchOptions: {
        aggregateTimeout: 1000,
        ignored: /node_modules/,
    }, */
    entry: {
        app: path.join(__dirname, 'src/js/common.js'),
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        // alias
        modules: [ // 告诉 webpack 解析模块时应该搜索的目录
            'node_modules',
        ],
        extensions: ['.js', '.json', '.jsx', '.css'] // 解析扩展名
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000, // 10k
                    name: '[hash:8].[name].[ext]',
                    publicPath: 'img/', // 替换CSS引用的图片路径 可以替换成爱拍云上的路径
                    outputPath: '../img/'
                }
            }]
        }, {
            test: /\.(woff|woff2|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[hash:8].[name].[ext]',
                    publicPath: 'font/',
                    outputPath: './font/'
                }
            }]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        }]
    },
    plugins: [
        new CleanPlugin(['dist'], {
            root: path.join(__dirname, './'),
            verbose: true,
            dry: false,
        }),
        new MiniCssExtractPlugin({
            filename: './dist/css/[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
    optimization: {
        splitChunks: {
            // 大于30KB才单独分离成chunk
            minSize: 30000, // 最小文件，默认0
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求数，默认1
        },
        minimizer: [
            // js mini
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
            }),
            new OptimizeCSSPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        sourcemap: true,
                        safe: true,
                        discardComments: {
                            removeAll: true,
                        },
                        discardUnused: false,
                        zindex: false
                    }],
                },
            })
        ],
    },
    node: {
        fs: 'empty',
    },
};
