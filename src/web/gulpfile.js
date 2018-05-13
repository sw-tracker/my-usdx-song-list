'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cleanCss = require('gulp-clean-css'),
  flatmap = require('gulp-flatmap'),
  htmlmin = require('gulp-htmlmin');

gulp.task('browser-sync', function () {
  var files = [
    './*.html',
    './css/*.css',
    './resources/*.js',
    './js/*.js',
    '.templates/*.hbs'
  ];

  browserSync.init(files, {
    server: {
      baseDir: "./"
    }
  });
});

// Default task
gulp.task('default', ['browser-sync'], function() {
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('copyfonts', function() {
  gulp.src('./css/fontawesome/webfonts/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/webfonts'));
});

gulp.task('usemin', function() {
  return gulp.src('./*.html')
    // flatmap allows to handle multiple files by setting up a parallel pipe for each file
    // and ensuring that all files follow the same steps
    .pipe(flatmap(function(stream, file){
      return stream
        .pipe(usemin({
          css: [ rev() ],
          html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
          js: [ uglify(), rev() ],
          inlinejs: [ uglify() ],
          inlinecss: [ cleanCss(), 'concat' ]
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

// with gulp tasks are executed in parallel, therefore we want clean
// to be done first and then start the others
gulp.task('build',['clean'], function() {
  gulp.start('copyfonts','usemin');
});
