const path = require('path');

module.exports = {
    mode: 'development',
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
                    {loader: 'css-loader', options: {}},
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