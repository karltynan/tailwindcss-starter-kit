/*
	Gulp tasks
	Author: @karltynan
*/

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var postcss = require('gulp-postcss');
var purgecss = require('gulp-purgecss');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

var cssSourcePath = './src/css/*.css';
var cssCopyPath = './src/css/copy**/*';
var cssOutputPath = './css/';

var jsSourcePath = [
	'./src/js/plugins/**/*.js',
	'./src/js/layout/**/*.js',
	'./src/js/modules/**/*.js',
	'./src/js/site.js'
];
var jsPlugins = ['./node_modules/blazy/blazy.min.js'];
var jsCopyPath = './src/js/copy/**/*';
var jsOutputPath = './js/';

var uglifyCssOptions = {
	"maxLineLen": 312,
	"uglyComments": true
};

// css build
function css_build() {
	// delete old files
	del([cssOutputPath + '**/*'], { force: true });
	// create new files
	return gulp.src(cssSourcePath)
		.pipe(postcss([
			require('tailwindcss'),
			require('autoprefixer')
		]))
		.pipe(gulp.dest(cssOutputPath))
		.pipe(uglifycss(uglifyCssOptions))
		.pipe(
			purgecss({
				content: [
					'./*.html',
					'./Views/**/*.cshtml',
					'./src/js/**/*.js'
				],
				extractors: [
					{
						extractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
						extensions: ['html', 'cshtml', 'js']
					}
				]
			})
		)
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(cssOutputPath));
}
// css copy
function css_copy() {
	return gulp.src(cssCopyPath)
		.pipe(gulp.dest(cssOutputPath))
		.pipe(filter('**/*.css'))
		.pipe(uglifycss(uglifyCssOptions))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(cssOutputPath));
}

// js build
function js_build () {
	// delete old files
	del([jsOutputPath + '**/*'], { force: true });
	// create new files
	return gulp.src(jsPlugins.concat(jsSourcePath))
		.pipe(concat('site.js'))
		.pipe(gulp.dest(jsOutputPath))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(jsOutputPath));
}

// js copy
function js_copy() {
	return gulp.src(jsCopyPath)
		.pipe(gulp.dest(jsOutputPath))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(jsOutputPath));
}

// watch
function watch_task() {
	gulp.watch(['./*.html', './Views/**/*.cshtml', './src/css/**/*.css', './src/js/**/*.js', './tailwind.config.js'], css_build);
	gulp.watch(['./src/js/**/*.js'], js_build);
}

const css_task = gulp.series(css_build, css_copy);
const js_task = gulp.series(js_build, js_copy);

exports.build = gulp.parallel(css_task, js_task);
exports.watch = gulp.series(gulp.parallel(css_task, js_task), watch_task);