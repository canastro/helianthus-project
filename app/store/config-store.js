'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./config-store.prod');
} else if (process.env.NODE_ENV === 'development') {
    module.exports = require('./config-store.dev');
}
