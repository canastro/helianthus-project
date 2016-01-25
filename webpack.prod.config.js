'use strict';

var webpack = require('webpack');
var path = require('path');

var paths = [];
paths = paths.concat(require('node-neat').includePaths);
paths = paths.concat(require('node-bourbon').includePaths);
paths = paths.concat(path.join(process.cwd(), 'node_modules', 'aviago-core-components', 'assets', 'sass'));
paths = paths.concat(path.join(process.cwd(), 'node_modules', 'react-select', 'scss'));

module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js'
    },
    resolve: {
        // modulesDirectories: [
        //     'resources',
        //     'node_modules'
        // ],
        // extensions: ['', '.json', '.js', '.jsx']
    },
    resolveLoader: {
        'fallback': path.join(__dirname, 'node_modules')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'app')
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
            loaders: ['style', 'css', 'sass']
        }]
    },
    sassLoader: {
        includePaths: paths
    }
};
