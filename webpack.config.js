'use strict';

var path = require('path');
var webpack = require('webpack');

var paths = [];
paths = paths.concat(require('node-neat').includePaths);
paths = paths.concat(require('node-bourbon').includePaths);
paths = paths.concat(path.join(process.cwd(), 'node_modules', 'font-awesome', 'scss'));
paths = paths.concat(path.join(process.cwd(), 'node_modules', 'react-select', 'scss'));
paths = paths.concat(path.join(process.cwd(), 'assets', 'styles'));
paths = paths.concat(path.join(process.cwd(), 'assets', 'fonts'));

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/index.js'
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    resolve: {
        // modulesDirectories: [
        //     'lib',
        //     'node_modules'
        // ]
        // ,
        // root: [
        //     path.join(process.cwd(), 'lib')
        // ]
        // modulesDirectories: [
        //     'resources',
        //     'node_modules'
        // ],
        // extensions: ['', '.json', '.js', '.jsx']
    },
    resolveLoader: {
        'fallback': path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'app'),
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }, {
            test:    /\.js$/,
            exclude: /node_modules/,
            loader: 'jscs-loader'
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loaders: ['eslint-loader', 'jscs-loader', 'react-hot', 'babel'],
            include: path.join(__dirname, 'node_modules', 'aviago-core-components', 'app')
        }]
    },
    sassLoader: {
        includePaths: paths
    }
};
