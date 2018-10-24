/*
	Gulp tasks for: tailwind-starter
	Author: hello@karltynan.co.uk
*/

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssimport = require("gulp-cssimport");
var cssnano = require('gulp-cssnano');
var tailwindcss = require('tailwindcss');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');

// css
gulp.task('css', function () {
	return gulp.src([
		'./src/css/*.css'
	])
		.pipe(cssimport())
		.pipe(postcss([
			tailwindcss('./tailwind.js'),
			require('autoprefixer')
		]))
		.pipe(gulp.dest('./css/'))
		.pipe(cssnano())
		.pipe(uglifycss({
			'maxLineLen': 312,
			'uglyComments': true
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./css/'));
});

// watch
gulp.task('watch', ['build'], function () {
	gulp.watch(['./src/css/**/*.css', './tailwind.js'], ['css']);
});

// build
gulp.task('build', ['css']);