const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './renderer/main.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'renderer.bundle.js'
    },
    devtool: 'source-map',
    mode: 'development',
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader", "css-loader", "less-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
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
            }, {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-react-loader',
                query: {
                    classIdPrefix: '[name]-[hash:8]__',
                    propsMap: {
                        fillRule: 'fill-rule'
                    },
                    xmlnsTest: /^xmlns(Xlink)?$/
                }
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
