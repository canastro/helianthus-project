"use strict";

var sass = require('gulp-sass');
var path = require('path');
var join = path.join;
var PATH = require('../workflow.config').PATH;

module.exports = function (gulp) {
    return function() {

        console.log(join(PATH.src.assets.styles.all, PATH.src.assets.styles.entry));
        return gulp.src(join(PATH.src.assets.styles.all, PATH.src.assets.styles.entry))
            .pipe(
                sass({
                    style: 'compressed',
            		includePaths:[
                        './node_modules/font-awesome/scss'
                    ]
                }).on('error', sass.logError)
            )
            .pipe(gulp.dest(PATH.dest.dev.all));
    }
};
