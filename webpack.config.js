/**
 * Webpack 환경설정
 * author :  Yejin Kim(yejin0216@gmail.com)
 */

var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        example: './src/example/arExample.js'
    },
    watchOptions: {
        ignored: ['bower_components', 'node_modules']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.js$/, // files ending with .js
            exclude: [/node_modules/, /bower_components/],// exclude the node_modules directory
            loader: "babel-loader" // use this (babel-core) loader
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 9000,
        historyApiFallback:true
    }
};