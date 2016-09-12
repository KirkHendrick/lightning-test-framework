/**
 * Created by khendrick on 9/9/16.
 */
const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    watch = require('gulp-watch');

gulp.task('monitorTests', function() {
    return watch(['./*.js', './test/*.js'], function() {
        gulp.src('./test/tests.js', {read: false})
            .pipe(mocha({reporter: 'nyan'}))
            .pipe(gulp.dest('build'));
    });
});