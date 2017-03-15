const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

gulp.task('js', () => {
    browserify('src/scripts/app.js', {debug: true})
         .transform('babelify', {
            sourceMaps: true,
            presets: ['es2015','react']
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 🚫'
        }))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/scripts'))
        .pipe(reload({stream:true}));
});

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task("styles", () => {
    return gulp.src("./src/styles/**/*.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat("style.css"))
    .pipe(plumber())
    .pipe(gulp.dest("./public/styles"))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['js','bs'], () => {
    gulp.watch('src/**/*.js',['js']);
    gulp.watch('./public/style.css',reload);
    gulp.watch('./src/styles/*.scss', ['styles']);
});