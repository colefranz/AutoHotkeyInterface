const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './renderer/main.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader", "css-loader", "less-loader", "postcss-loader"
                ],
                include: [
                    path.resolve(__dirname, 'renderer')
                ]
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env'],
                    plugins: ["transform-class-properties"]
                },
                include: [
                    path.resolve(__dirname, 'renderer')
                ]
            }
        ]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [
        new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ]),
        new HtmlWebPackPlugin({
            template: './renderer/index.html',
            filename: './index.html'
        })
    ]
};
