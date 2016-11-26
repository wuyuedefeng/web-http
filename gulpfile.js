// npm install gulp-browserify babelify  gulp-plumber gulp --save-dev
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
gulp.task('es6ToEs5', function() {
    return browserify('./src/_web-http.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});


// npm install --save-dev gulp-watch --save-dev
var watch = require('gulp-watch');
gulp.task('watch',['es6ToEs5'], function(){
    watch('./src/**/*.js', function () {
        gulp.run('es6ToEs5');
    });
});
