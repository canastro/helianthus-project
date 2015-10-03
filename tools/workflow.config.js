"use strict";

var argv = require('yargs').argv;

// --------------
// Configuration.
var PORT             = argv['port']        || 5555;
var LIVE_RELOAD_PORT = argv['reload-port'] || 4002;
var APP_BASE         = argv['base']        || '/';

var APP_ASSETS = 'assets';
var APP_SRC = 'app';
var APP_DEST = 'dist';
var ANGULAR_BUNDLES = './node_modules/angular2/bundles';
var NODE_MODULES = 'node_modules';

var PATH = {
    dest: {
        all: APP_DEST,
        dev: {
            all: APP_DEST + '/dev',
            lib: APP_DEST + '/dev/lib',
            fonts: APP_DEST + '/dev/fonts',
        },
        prod: {
            all: APP_DEST + '/prod',
            lib: APP_DEST + '/prod/lib'
        }
    },
    src: {
        all: APP_SRC,
        lib: [
            // Order is quite important here for the HTML tag injection.
            require.resolve('traceur/bin/traceur-runtime.js'),
            require.resolve('reflect-metadata/Reflect.js'),
            require.resolve('reflect-metadata/Reflect.js.map'),
            require.resolve('systemjs/dist/system.src.js'),
            require.resolve('jquery/dist/jquery.min.js'),
            require.resolve('jquery/dist/jquery.min.map'),
            require.resolve('tether/dist/js/tether.js'),
            require.resolve('moment/moment.js'),
            APP_SRC + '/system.config.js',
            ANGULAR_BUNDLES + '/angular2.dev.js',
            ANGULAR_BUNDLES + '/router.dev.js',
            ANGULAR_BUNDLES + '/http.dev.js'
        ],

        assets: {
            fonts: APP_ASSETS + '/fonts',
            images: APP_ASSETS + '/images',
            styles: {
                all: APP_ASSETS + '/styles',
                entry: 'app.scss'
            }
        },
        node_modules: {
            all: NODE_MODULES,
            fontawesome: NODE_MODULES + '/font-awesome/fonts'
        }
    }
};

var CONFIG = {
    PORT: PORT,
    LIVE_RELOAD_PORT: LIVE_RELOAD_PORT,
    APP_BASE: APP_BASE,
    APP_SRC: APP_SRC,
    APP_DEST: APP_DEST,
    ANGULAR_BUNDLES: ANGULAR_BUNDLES,
    PATH: PATH
};
module.exports = CONFIG;
