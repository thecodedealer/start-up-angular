var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    })
});

gulp.task('jshint', function () {
    return gulp.src('scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function () {
    return gulp.src('style/scss/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('style'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('start', ['browserSync', 'sass'], function () {
    gulp.watch('style/scss/*.scss', ['sass'])
    gulp.watch('scripts/*.js', browserSync.reload)
    gulp.watch('views/*.html', browserSync.reload)
    gulp.watch('*.html', browserSync.reload)
});
