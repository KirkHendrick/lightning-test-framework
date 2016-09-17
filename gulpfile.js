/**
 * Created by khendrick on 9/9/16.
 */
const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    watch = require('gulp-watch'),
    change = require('gulp-change'),
	replace = require('gulp-replace');

gulp.task('monitorTests', function() {
	watchTests();
	//watchLightning();
});

function watchLightning() {
	const lightningFiles = './lightning-skeleton/*.js';
	return watch(lightningFiles, function() {
		gulp.src(lightningFiles, function () {
			// is not running tasks
			// problem might here
			convertHelper();
			convertController();
		});
	});
}

function watchTests() {
	return watch(['./*.js', './**/*.js'], function() {
		gulp.src('./test/tests.js', {read: false})
			.pipe(mocha({reporter: 'nyan'}))
			.pipe(gulp.dest('build'));
	});
}

function parseController(content) {
	const head = "var Mock$A = require('./../Mock$A').Mock$A; var Controller = (function ($A) { 'use strict'; return ";

	const body = content.substr(content.indexOf('{'))
				.trim().slice(0, -1).replace(/(\r\n|\n|\r)/gm,"");

	const foot = " })(Mock$A()); exports.Controller = Controller; ";

	return head + body + foot;
}


function parseHelper(content) {
	const head = "var Mock$A = require('./../Mock$A').Mock$A; var Helper = (function ($A) { 'use strict'; return ";

	const body = content.substr(content.indexOf('{'))
		.trim().slice(0, -1).replace(/(\r\n|\n|\r)/gm,"");

	const foot = " })(Mock$A()); exports.Helper = Helper; ";

	return head + body + foot;
}

function convertController() {
	return gulp.src('./lightning/*Controller.js')
		.pipe(change(parseController))
		.pipe(gulp.dest('./build/'));
}

function convertHelper() {
	return gulp.src('./lightning/*Helper.js')
		.pipe(change(parseHelper))
		.pipe(gulp.dest('./build/'));
}

gulp.task('convertLightning', function() {
	convertController();
	convertHelper();
});