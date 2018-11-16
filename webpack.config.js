/**
 * Webpack 환경설정
 * author :  Yejin Kim(yejin0216@gmail.com)
 */

var path = require('path');

module.exports = {
    entry: './src/example/arExample.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 9000,
        historyApiFallback:true
    }
};