var gulp = require('gulp');
var eslint = require('gulp-eslint');
var zip = require('gulp-zip');

var FILES = [
  'bin/*.js',
  'db/*.js',
  'routes/*.js',
  'public/js/indexPage.js',
  'public/js/playerLookupPage.js',
  'app.js'
];

gulp.task('eslint', function () {
  return gulp.src(FILES)
    .pipe(eslint({}))
    .pipe(eslint.format());
});

gulp.task('zip', function () {
  return gulp.src(FILES, { base: '.' })
    .pipe(zip('files.zip'))
    .pipe(gulp.dest(''));
});
