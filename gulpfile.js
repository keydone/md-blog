const gulp = require('gulp');
const del = require('del');
const scss = require('gulp-scss');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');

gulp.task('clean', () => del(['static/css', 'static/js']));

gulp.task('css', () => gulp.src('./src/scss/base.css')
    .pipe(scss())
    .pipe(cssnano())
    .pipe(gulp.dest('./static/css')));

gulp.task('postcss', () => gulp.src('./src/scss/post.scss')
    .pipe(scss())
    .pipe(cssnano())
    .pipe(gulp.dest('./static/css')));

gulp.task('commonjs', () => gulp.src('./src/js/common/*.js')
    .pipe(concat('common.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./static/js')));

gulp.task('lib', () => gulp.src(['./src/js/layout/*.js', './src/js/libs/*.js'])
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./static/js')));

gulp.task('post', () => gulp.src('./src/js/page/post.js')
    .pipe(concat('post.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./static/js')));

gulp.task('default', ['clean', 'css', 'postcss', 'commonjs', 'lib', 'post']);
