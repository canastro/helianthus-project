"use strict";

var path = require('path');
var join = path.join;
var PATH = require('../workflow.config').PATH;

module.exports = function (gulp) {

    return function () {
        return gulp.src([
            join(PATH.src.node_modules.fontawesome, '*'),
            join(PATH.src.assets.fonts, '**/*')
        ])
        .pipe(gulp.dest(PATH.dest.dev.fonts));
    };
};
