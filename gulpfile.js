const gulp          = require('gulp');
const vfs           = require('vinyl-fs');
const browserSync   = require('browser-sync').create();
const notify        = require("gulp-notify");
const plumber       = require('gulp-plumber');
const debug         = require('gulp-debug');
const htmlmin       = require('gulp-html-minifier');
const imagemin      = require('gulp-imagemin');
const sass          = require('gulp-sass');
const sourcemap     = require('gulp-sourcemaps');
const media         = require('gulp-group-css-media-queries');
const autoprefix    = require('gulp-autoprefixer');
const cleancss      = require('gulp-clean-css');
const concat        = require('gulp-concat');
const minJs         = require('gulp-uglify-es').default;
const newer         = require('gulp-newer');
const del           = require('del');
sass.compiler       = require('node-sass');
// Compile SASS file

const html = function () {
    return vfs.src('./frontend/*.html')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(newer('build'))
        .pipe(gulp.dest('./build/'))
        .pipe(debug({ title: '----HTML : ' }));
}

const scss = function (done) {
     vfs.src('./frontend/css/*.scss')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(newer('./build/css'))
        // .pipe(sourcemap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(media())
        .pipe(autoprefix({
            browsers: ['>0.1%'],
            cascade: false
        }))
        .pipe(cleancss({
            level: 2
        }))
        // .pipe(sourcemap.write())
        .pipe(debug({ title: '----SCSS : ' }))
        .pipe(gulp.dest('./build/css'));
    done();
}

const images = function () {
    return vfs.src('./frontend/images/**/*.*')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(newer('./build/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
        .pipe(debug({ title: '----IMAGES : ' }));
} 

const jsFiles = [
    // './frontend/js/GridPlugin.js',
    './frontend/js/jquery-3.4.1.min.js',
    './frontend/js/jquery.maskedinput.min.js',
    './frontend/js/owl.carousel.min.js',
    './frontend/js/serviseLib.js',
    './frontend/js/script.js'
];

const js = function () {
    return vfs.src(jsFiles)
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(newer('./build/js'))
        .pipe(concat('scripts.js'))
        .pipe(minJs({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(debug({ title: '----JS : ' }));
}

const browser = function (done) {
    browserSync.init({
        server: {
            baseDir: "./build/",
        },
        // tunnel: true
    });
    done();
}

const refresh = function (done) {
    browserSync.reload();
    done();
}

const watchTimeOut = () =>  gulp.series(html, scss, images,js, refresh);
const watch = function () {
    gulp.watch('./frontend/**/*.*', (done) => {
        setTimeout(watchTimeOut(), 200);
        done();
    });
}

const dell = function (done) {
    del('./build').then(paths => console.log('---- DELETED FILES: ', paths.join('\n')));
    done();
}

exports.build   = gulp.series(html, scss, images,js);
exports.dell    = dell;
exports.develop = gulp.parallel(browser, watch);


/**
 * Cataloges:
 * 
 * __ frontenf
 *  |--- css
 *  |  |--- imports
 *  |  |  |___ _reset.scss
 *  |  |  |___ _typography.scss
 *  |  |
 *  |  |___ style.scss
 *  | 
 *  |--- images
 *  |
 *  |--- js      
 *  |
 *  |___ index.html
 * 
 */