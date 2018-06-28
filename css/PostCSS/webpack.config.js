const path = require('path');

// 'production' か 'development' を指定
const MODE = 'development';

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = (MODE === 'development');


module.exports = {
    mode: MODE,
    entry: './src/js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                            // CSSの空白文字を削除する
                            minimize: true,
                            // ソースマップを有効にする
                            sourceMap: enabledSourceMap,
                        },
                    },
                ],
            },
            // {
            //     loader: 'postcss-loader',
            //     plugins:[
            //          // require('autoprefixer')({grid: true})
            //     ]
            // }
        ]
    }


}