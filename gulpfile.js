// npm install gulp-browserify babelify  gulp-plumber gulp --save-dev
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
gulp.task('es6ToEs5', function() {
    return gulp.src('./src/_web-http.js')
        .pipe(plumber())
        .pipe(browserify({
            transform: ["babelify"]
        }))
        .pipe(gulp.dest('./'));
});


// npm install --save-dev gulp-watch --save-dev
var watch = require('gulp-watch');
gulp.task('watch',['es6ToEs5'], function(){
    watch('./src/**/*.js', function () {
        gulp.run('es6ToEs5');
    });
});
