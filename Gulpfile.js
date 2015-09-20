var gulp = require('gulp');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var del = require('del');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var modRewrite = require('connect-modrewrite');
var historyApiFallback = require('connect-history-api-fallback');

var tasks = {
	'default': 'default',
	cleanAll : 'Clean-All',
	typeScript: 'TypeScript-Compile',
	sass: 'Compile-SASS',
	html: 'Copy-HTML',
	copyFonts: 'Copy-Fonts',
	copyIcons: 'Copy-FontAwesome-Icons',
	copy: 'Copy-Compiled-JS',
	copyVendors: 'Copy-Vendors',
	startWebServer: 'Start-WebServer',
	watch: 'Watch',
	watcherRebuild: 'Watcher-Rebuild'
};

// Main task
gulp.task(tasks.default, function () {
	runSequence(
        tasks.cleanAll,
		tasks.typeScript,
		tasks.sass,
		tasks.html,
		tasks.copy,
		tasks.copyIcons,
		tasks.copyFonts,
		tasks.copyVendors,
		tasks.startWebServer,
		tasks.watch
    );
});

// default task starts watcher. in order not to start it each change
// watcher will run the task bellow
gulp.task(tasks.watcherRebuild, function (callback) {
	runSequence(
        tasks.cleanAll,
		tasks.typeScript,
		tasks.sass,
		tasks.html,
		tasks.copyVendors,
		tasks.copy,
		tasks.copyIcons,
		tasks.copyFonts
	);
	callback();
});

// compiles *.ts files by tsconfig.json file and creates sourcemap filse
gulp.task(tasks.typeScript, function () {
	var tsProject = ts.createProject('tsconfig.json', {
		typescript: typescript
	});

	return gulp.src(['typings/**/**.ts', 'src/**/**.ts'])
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject))
		.pipe(sourcemaps.write('../maps', { includeContent: false, sourceRoot: '/src' }))
        .pipe(gulp.dest('build'));
});

// copy *.html files (templates of components)
// to apropriate directory under public/scripts
gulp.task(tasks.html, function () {
	return gulp.src(['src/**/**.html'])
        .pipe(gulp.dest('build'));
});

gulp.task(tasks.sass, function (done) {

    return gulp.src('./src/assets/styles/main.scss')
        .pipe(
            sass({
                style: 'compressed',
				includePaths:[
                    './node_modules/font-awesome/scss'
                ]
            }).on('error', sass.logError)
        )
        .pipe(gulp.dest('./build/assets/styles'));
});


// copy generated/compiled files
// from  directory to public/scripts directory
gulp.task(tasks.copy, function () {
	return gulp.src(['build/**/*.*'], { base: "build" })
		.pipe(gulp.dest('public'))
		.pipe(connect.reload());
});

gulp.task(tasks.copyIcons, function() { 
    return gulp.src('./node_modules/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('public/assets/fonts')); 
});

gulp.task(tasks.copyFonts, function() { 
    return gulp.src('./src/assets/fonts/**/*') 
        .pipe(gulp.dest('public/assets/fonts')); 
});

gulp.task(tasks.copyVendors, function() { 
    return gulp.src('./node_modules/tether/dist/js/tether.min.js') 
        .pipe(gulp.dest('public/assets/vendors')); 
});

//  clean all generated/compiled files
//	in both  and public/ directories
gulp.task(tasks.cleanAll, function () {
	return del(['public/', 'build', 'maps']);
});

// watcher
gulp.task(tasks.watch, function () {
	gulp.watch(['src/**/**.ts', 'src/**/**.html', 'src/**/*.scss'], [tasks.watcherRebuild]);
});

// starts web server
gulp.task(tasks.startWebServer, function () {

	connect.server({
		root: 'public',
		port: 8000,
		host: '0.0.0.0',
		livereload: true,
		middleware: function() {
			return [
				modRewrite([
					'^/api/(.*)$ http://localhost:8080/api/$1 [P]',
					'^/static/(.*)$ http://localhost:8080/static/$1 [P]',
				]),
				historyApiFallback()
			];
		}
	});

});
