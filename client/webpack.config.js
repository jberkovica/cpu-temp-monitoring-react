const { resolve } = require('path');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './src/index',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // resolve: {
    //     extensions: [".js", ".jsx"] },
    // module: {
    // 	rules: [
    // 			{
    //                 test: /\.js$/,
    //                 exclude: /node_modules/,
    // 				loader: 'babel-loader',
    // 			},
    // 			{
    // 				test: /\.css$/,
    // 				exclude: /node_modules/,
    // 				loader: 'style-loader'
    // 			},
    // 		]
    // 	},
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     cacheDirectory: true,
                    //     cacheCompression: false,
                    //     envName: isProduction ? 'production' : 'development',
                    // },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
