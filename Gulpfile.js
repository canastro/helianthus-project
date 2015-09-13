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

var tasks = {
	'default': 'default',
	cleanAll : 'Clean-All',
	typeScript: 'TypeScript-Compile',
	sass: 'Compile-SASS',
	html: 'Copy-HTML',
	copy: 'Copy-Compiled-JS',
	cleanSrc: 'Clean-Source',
	cleanPublic: 'Clean-Public',
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
		tasks.cleanSrc,
		tasks.startWebServer,
		tasks.watch
    );
});

// default task starts watcher. in order not to start it each change
// watcher will run the task bellow
gulp.task(tasks.watcherRebuild, function (callback) {
	runSequence(
		tasks.cleanPublic,
		tasks.typeScript,
		tasks.sass,
		tasks.html,
		tasks.copy,
		tasks.cleanSrc
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
                style: 'compressed'
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

//  clean all generated/compiled files
//	in both  and public/ directories
gulp.task(tasks.cleanAll, function () {
	return runSequence(tasks.cleanSrc, tasks.cleanPublic);
});

//  clean all generated/compiled files
//	only in public/ directory
gulp.task(tasks.cleanPublic, function () {
	return del(['public/scripts']);
});

//  clean all generated/compiled files
//	only in both  directory
gulp.task(tasks.cleanSrc, function () {
	return del(['build', 'maps']);
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
		livereload: true,
		middleware: function() {
			return [
				modRewrite([
					'^/api/(.*)$ http://localhost:8080/api/$1 [P]'
				])
			];
		}
	});

});
