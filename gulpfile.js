'use strict';

const { src, dest, parallel } = require('gulp');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');
const rtlcss = require('gulp-rtlcss');

// Convert style.scss files to .css
function themeCss() {
    return src('./assets/scss/style.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
		.pipe(dest('./assets/css/'))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
        .pipe(dest('./assets/css/'));
}

// Copy bootsrap css files.
function bootsrapCss() {
    return src('./assets/scss/bootstrap.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(dest('./assets/css/'))
        .pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('./assets/css/'));
}

// Copy bootsrap js files.
function bootsrapJs() {
    return src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', { sourcemaps: true })
        .pipe(dest('./assets/js/', { sourcemaps: true }));
}

// Copy jquery js files.
function jqueryJs() {
    return src('./node_modules/jquery/dist/jquery.slim.min.js', { sourcemaps: true })
    	.pipe(dest('./assets/js/', { sourcemaps: true }));
}

// Copy jquery js files.
function createRtl() {
    return src(['./assets/css/style.css', './assets/css/bootstrap.css'])
		.pipe(rename({ suffix: '-rtl' }))
		.pipe(rtlcss())
		.pipe(dest('./assets/css/', { sourcemaps: true }));
}

exports.js = parallel(jqueryJs, bootsrapJs);
exports.css = parallel(themeCss, bootsrapCss);
exports.rtl = parallel(createRtl);
exports.default = parallel(themeCss, bootsrapCss, jqueryJs, bootsrapJs);
