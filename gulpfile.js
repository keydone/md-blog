const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
sass.compiler = require('node-sass');

gulp.task('clean', () => del(['public/static/css', 'public/static/js']));

gulp.task('css', () => gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(cssnano({
        'cssnano-preset-advanced': {
            zindex: false,
        },
        reduceIdents: false,
        discardComments: { removeAll: true }
    }))
    .pipe(gulp.dest('./public/static/css')));

gulp.task('commonjs', () => gulp.src('./src/js/common/*.js')
    .pipe(concat('common.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/static/js')));

gulp.task('lib', () => gulp.src(['./src/js/libs/*.js'])
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/static/js')));

gulp.task('post', () => gulp.src('./src/js/page/post.js')
    .pipe(concat('post.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/static/js')));

gulp.task('filepond', () => gulp.src('./src/js/page/filepond.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/static/js')));

gulp.task('editor', () => gulp.src('./src/js/editor/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/static/js')));

gulp.task('editor-plugins-css', () => gulp.src('./src/js/editor/**/*.{css,json}')
    .pipe(gulp.dest('./public/static/js')));

gulp.task('editor-plugins-js', () => gulp.src('./src/js/editor/**/*.js')
    // .pipe(uglify())
    .pipe(gulp.dest('./public/static/js')));

/* gulp.task('md-plugins', () => gulp.src('./src/js/markdown/*.js')
    .pipe(concat('md-plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/static/js'))); */

const tasks = [
    // 'clean',
    // 'lib',
    'css',
    'post',
    'commonjs',
    'filepond',
    'editor',
    'editor-plugins-css',
    'editor-plugins-js',
];

gulp.task('default', () => {
    gulp.watch('src/**/*', gulp.series(tasks));
});
