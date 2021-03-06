'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cleanCss = require('gulp-clean-css'),
  flatmap = require('gulp-flatmap'),
  htmlmin = require('gulp-htmlmin'),
  gutil = require('gulp-util'),
  ftp = require( 'vinyl-ftp' ),
  prompt = require('gulp-prompt'),
  runSequence = require('run-sequence');

// for handlebars
var handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    path = require('path');

//---------------------------------------------------------------------------------------------------------------------
// FTP credentials: the user will be prompted
var user = '';
var password = '';
var host = '';
var port = 21;

//---------------------------------------------------------------------------------------------------------------------
// Handlebars
gulp.task('partials-to-js', function() {
  // Assume all partials start with an underscore
  gulp.src(['./templates/*partial*.hbs'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function(fileName) {
          // Strip the extension
          // Escape the output with JSON.stringify
          return JSON.stringify(path.basename(fileName, '.js'));
        }
      }
    }))
    .pipe(concat('gen_partials.js')) // output filename
    .pipe(gulp.dest('./js/handlebars/')) // output folder path
  ;
});

gulp.task('templates-to-js', function(){
  gulp.src('./templates/*template*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'usdxSongList.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('gen_templates.js')) // output filename
    .pipe(gulp.dest('./js/handlebars/')) // output folder path
  ;
});

// taks to watch the template files and when they are modified automatically generate the js
gulp.task('hbs:watch', function () {
  gulp.watch('./templates/*.hbs', ['templates-to-js', 'partials-to-js']);
});

//---------------------------------------------------------------------------------------------------------------------
// FTP
// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
  console.log('getFtpConnection');
  return ftp.create({
    host: host,
    port: port,
    user: user,
    password: password,
    parallel: 5,
    log: gutil.log
  });
}

gulp.task('ftp-clean', function () {
  console.log('FTP-CLEAN');
  var remoteGlobs = [
    './css/*',
    './js/*',
    './webfonts/*',
    './index.html'
  ];
  var localFilesGlob = './dist/**/*';
  var conn = getFtpConnection();
  // base is the remote base folder
  return conn.clean( remoteGlobs, localFilesGlob, { base: '.' } );
});

gulp.task('ftp-copy', function() {
  console.log('FTP-COPY');
  var conn = getFtpConnection();

  var localFilesGlob = ['./dist/**/*']; // files to copy
  var remoteFolder = '/'; // where to copy them to

  // base is the local base folder
  return gulp.src(localFilesGlob, { base: './dist/', buffer: false })
    .pipe( conn.dest( remoteFolder ) )
  ;
});

var doFtp = function(options, resp) {
  console.log('doFtp');
  runSequence(
    'ftp-clean',
    'ftp-copy'
  );
};

var validateInput = function(input) {
  if (input.length == 0) {
    console.log('invalid input!');
    return false;
  }
  return true;
}

var getCredentials = function() {
  if (host.length == 0) {
    gulp.src('./package.json')
      .pipe(prompt.prompt(
        [
          {
            type: 'input',
            name: 'host',
            message: 'FTP Host: ',
            validate : validateInput
          },
          {
            type: 'input',
            name: 'username',
            message: 'Username: ',
            validate : validateInput
          },
          {
            type: 'password',
            name: 'pass',
            message: 'Password: ',
            validate : validateInput
          }]
        , function (res) {
          host = res.host;
          user = res.username;
          password = res.pass;
          // here we call the function that does the heavy lifting
          doFtp();
        }));
  }
}

/**
 * Deploy task.
 * - Ask user for credentials
 * - Delete files from the server
 * - Copy everything from dist to the server
 */
gulp.task('ftp-deploy', function() {
  // set the command window title to contain the folder of the project
  // this way I can automatically fill in the credentials using KeyPass
  process.title += ' ' + process.cwd();
  getCredentials();
});

//---------------------------------------------------------------------------------------------------------------------
// Live server
gulp.task('browser-sync', function () {
  var files = [
    './*.html',
    './css/*.css',
    './resources/*.js',
    './js/**/**.js', // watch folders and sub-folders
    '.templates/*.hbs',
    '.dist/*.html'
  ];

  browserSync.init(files, {
    server: {
      baseDir: "./"
    }
  });
});

// Default task
gulp.task('default', ['browser-sync'], function() {
  gulp.start('hbs:watch');
});

//---------------------------------------------------------------------------------------------------------------------
// BUILD
// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('copyfonts', function() {
  gulp.src('./css/fontawesome/webfonts/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/webfonts'));
});

// the files to minimize and concat are surrounded by build tags in the html index file
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
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    }))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist/'));
});

// with gulp tasks are executed in parallel, therefore we want clean
// to be done first and then start the others
gulp.task('build',['clean'], function() {
  gulp.start('copyfonts', 'templates-to-js', 'partials-to-js', 'usemin');
});
