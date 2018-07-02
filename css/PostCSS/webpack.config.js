const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 'production' か 'development' を指定
const MODE = 'development';

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = (MODE === 'development');


module.exports = {
    mode: MODE,
    entry: {
        main: './src/js/main.js',
        style: './src/css/style.scss'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // オプションでCSS内のurl()メソッドの取り込みを禁止する
                                // url: false,
                                // CSSの空白文字を削除する
                                // minimize: true,
                                // ソースマップを有効にする
                                sourceMap: enabledSourceMap,


                                // 0 => no loaders (default);
                                // 1 => postcss-loader;
                                // 2 => postcss-loader, sass-loader
                                importLoaders: 2

                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options:{
                                sourceMap: enabledSourceMap,
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        grid: true,
                                        browsers: [
                                            // "last 1 version",
                                            "> 10%",
                                            'ie >= 9'
                                        ],
                                    }),
                                ]
                            },
                        },

                        {
                            loader: 'sass-loader',
                            options:{
                                sourceMap: enabledSourceMap,
                            }
                        }
                    ]
                })
            },
            //
        ]
    },

    plugins: [
        new ExtractTextPlugin("../css/[name].css")
    ]

};
