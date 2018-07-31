var gulp       = require('gulp'),
  sass         = require('gulp-sass'),
  browserSync  = require('browser-sync'),
  concat       = require('gulp-concat'),
  uglify       = require('gulp-uglifyjs'),
  cssnano      = require('gulp-cssnano'),
  rename       = require('gulp-rename'),
  del          = require('del'),
  imagemin     = require('gulp-imagemin'),
  pngquant     = require('imagemin-pngquant'),
  cache        = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  ts           = require('gulp-typescript');

// var tsconfig = require('./tsconfig');
var tsconfig = {
  target: 'es5',
  noImplicitAny: true,
  outFile: 'app.output.js'
};

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'demo'
    },
    notify: false
  });
});

gulp.task('scripts', function() {

  return gulp.src('src/**/*.ts')
    .pipe(ts(tsconfig))
    .pipe(gulp.dest('demo'));
});

gulp.task('watch', ['browser-sync', 'scripts'], function() {

  gulp.watch('demo/*.html', browserSync.reload);

  const watcher = gulp.watch('src/**/*.ts', browserSync.reload);
  watcher.on('change', function (event) {

    gulp.src('src/**/*.ts')
      .pipe(ts(tsconfig))
      .pipe(gulp.dest('demo'));

  });
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('build', ['clean', 'scripts'], function() {
  return gulp.src('src/**/*.ts')
    .pipe(ts({...tsconfig, ...{outFile: 'app.min.js'}}))
    .pipe(uglify())
    .pipe(gulp.dest('demo'));
});

gulp.task('clear', function (callback) {
  return cache.clearAll();
});

gulp.task('default', ['watch']);