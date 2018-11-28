const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: [path.join(__dirname, "src/js/common.js")],
    output: {
        publicPath: '/',
        filename: "[name].bundle.js",
        path: path.join(__dirname, "static"),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [

            ]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                "postcss-loader",
            ]
        }, {
            test:/\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000, // 10k
                    name:"[hash:8].[name].[ext]",
                    publicPath:"img/",	//替换CSS引用的图片路径 可以替换成爱拍云上的路径
                    outputPath:"../img/"
                }
            }]
        }, {
            test:/\.(woff|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name:"[hash:8].[name].[ext]",
                    publicPath:"font/",	//替换CSS引用的图片路径 可以替换成爱拍云上的路径
                    outputPath:"../font/"
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
};
