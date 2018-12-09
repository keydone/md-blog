const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        common: path.resolve(__dirname, 'src/js/common.js'),
        index: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        publicPath: '/',
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        // alias、
        modules: [ // 告诉 webpack 解析模块时应该搜索的目录
            'node_modules',
        ],
        extensions: ['.js', '.json', '.jsx', '.css'] // 解析扩展名
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/,
            exclude: /node_modules/,
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
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[hash:6].[name].[ext]',
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
        new CleanPlugin(['./dist']),
    ],
    node: {
        fs: 'empty',
        module: true,
        child_process: true,
    },
};
