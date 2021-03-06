const gulp = require('gulp'),
	change = require('gulp-change'),
	settings = require('./settings');

gulp.task('convert', function () {
	validateSettings();
	settings.componentBundles.forEach(function (bundleName) {
		convertController(bundleName);
		convertHelper(bundleName);
	});
});

function validateSettings() {
	if(settings.ltfDirectory.slice(-1) === '/') {
		settings.ltfDirectory = settings.ltfDirectory.slice(0, -1);
	}

	if(settings.buildDirectory.slice(-1) === '/') {
		settings.buildDirectory = settings.buildDirectory.slice(0, -1);
	}

	if(settings.auraDirectory.slice(-1) === '/') {
		settings.auraDirectory = settings.auraDirectory.slice(0, -1);
	}
}

function parseLightning(content, type) {
	return "var Mock$A = require('" + settings.ltfDirectory + "/Mock$A').Mock$A," +
		type + " = (function($A) { " +
		"'use strict'; " +
		"var publicApi = " +

		content
			.substr(content.indexOf('{'))
			.trim()
			.slice(0, -1)
			.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '')
			.replace(/(\r\n|\n|\r)/gm, "") +

		"; return publicApi; " +
		"})(Mock$A()); " +
		"exports." + type + " = " + type + "; ";
}

const parseHelper = function (content) {
	return parseLightning(content, 'Helper');
};

const parseController = function (content) {
	return parseLightning(content, 'Controller');
};

function convertController(bundleName) {
	return gulp.src(settings.auraDirectory + '/' + bundleName + '/*Controller.js')
		.pipe(change(parseController))
		.pipe(gulp.dest(settings.buildDirectory));
}

function convertHelper(bundleName) {
	return gulp.src(settings.auraDirectory + '/' + bundleName + '/*Helper.js')
		.pipe(change(parseHelper))
		.pipe(gulp.dest(settings.buildDirectory));
}

