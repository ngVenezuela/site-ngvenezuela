'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var header = require('gulp-header');
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @author <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' */\n\n'
].join('\n');

// App Bundle
gulp.task('bundleJS', function () {
    var angular = './node_modules/angular/angular.js';
    var uiRouter = './node_modules/angular-ui-router/release/angular-ui-router.js';

    return gulp.src([angular, uiRouter])
        .pipe(sourcemaps.init())
        .pipe(concat('angular-libs.min.js'))
        .pipe(uglify())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

// App Bundle
gulp.task('my-app', function () {
    var appModule = './src/js/modules/*.js';
    var appService = './src/js/services/*.js';
    var appRoutes = './src/js/routes/*.js';
    var appController = './src/js/home/*.js';

    return gulp.src([appModule, appRoutes, appService, appController])
        .pipe(sourcemaps.init())
        .pipe(concat('app-libs.min.js'))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

// CSS
gulp.task('css', function () {
    var myCSS = './src/css/**/*';

    gulp.src([myCSS])
        .pipe(minifyCSS('*'))
        .pipe(concat('app.min.css'))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest('./css'));
});

// Copiar archivos estaticos (icon fonts bootstrap/font-awesome)
gulp.task('static', function () {
    var myFonts = './src/fonts/**/*';
    var myImages = './src/img/**/*';
    var myJs = './src/js/*.js';

    gulp.src([myFonts])
        .pipe(gulp.dest('./fonts'));
    gulp.src([myImages])
        .pipe(gulp.dest('./img'));
    gulp.src([myJs])
        .pipe(gulp.dest('./js'));
});

// Default
gulp.task('default', ['static', 'css', 'bundleJS', 'my-app', 'browser-sync']);

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['my-app'], browserSync.reload);

// Servidor estático.
// Crea un servidor local y efectúa un Livereload
// cuando ocurren cambios  dentro de directorio 'src'
gulp.task('browser-sync', ['bundleJS'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/js/**/*', ['js-watch']);
});