// 'use strict';

var gulp = require('gulp');
// var clean = require('rimraf');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');


var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var wiredep = require('wiredep').stream;
var minify = require('gulp-minify-css');
// var useref = require('gulp-useref');
// var assets = useref.assets();
// var gulpif = require('gulp-if');
// var connect = require('connect');
// var serveStatic = require('serve-static');
// var serveIndex = require('serve-index');


gulp.task('clean', function () {
  return gulp.src(['dist/index.html', 'dist/styles'], {read: false})
    .pipe(clean());
});
// **/*


gulp.task('lint', function () {
  return gulp.src('client/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
  return gulp.src('./client/scripts/*.js')
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('images', function () {
  return gulp.src('./client/Assets/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('fonts', function () {
  return gulp.src('./client/styles/fonts/*')
    .pipe(gulp.dest('./dist/styles/fonts'));
});

gulp.task('bower', function () {
  return gulp.src('./client/bower_components/**/*')
    .pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('icons', function () {
  return gulp.src('./client/assets/icons/*')
    .pipe(gulp.dest('./dist/assets/icons'));
});

gulp.task('html', function () {
    return gulp.src('./client/*.html')
      .pipe(gulp.dest('./dist'));
});

gulp.task('install', shell.task([
  'npm install',
  'bower install'
]));

// gulp.task('build', ['html', 'sass', 'images', 'icons', 'fonts', 'bower'], function() {
  // gulp.start('uglify');
  // gulp.start('minify');
// });

gulp.task('devBuild', ['clean', 'lint'], function() {
  gulp.start('build');
  gulp.watch('./client/styles/**/*.scss', ['sass'])
  // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
  .on('change', function(evt) {
      console.log(
          '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
      );
  });

});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});


// gulp.task('serve', ['styles', 'connect'], function () {

gulp.task('watcher', function() {
    livereload.listen();

    require('opn')('http://localhost:' + port);
    gulp.watch('./client/styles/**/*.scss', ['styles']);
    // gulp.watch('bower.json', ['wiredep']);
    gulp.watch('./client/scripts/*.js', ['uglify']);
    gulp.watch('./client/*.html', ['html']);
    gulp.watch([
        './dist/*.html',
        './dist/styles/**/*.css',
        './dist/scripts/**/*.js',
        './dist/assets/**/*'
    ]).on('change', livereload.changed);
});

// formats and makes custom errors more uniform
// combine with gulp-util or npm colors for nicer output
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};


// Setting up the sass task
gulp.task('sass', function (){
    // Taking the path from the above object
    gulp.src('./client/styles/**/*.scss')
    // Sass options - make the output compressed and add the source map
    // Also pull the include path from the paths object
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : './client/styles'
    }))
    // If there is an error, don't stop compiling but use the custom displayError function
    .on('error', function(err){
        displayError(err);
    })
    // Pass the compiled sass through the prefixer with defined 
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    // put compiled sass into css file
    .pipe(gulp.dest('./dist/styles'))
});



gulp.task('build', ['html', 'sass', 'images', 'uglify']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
  // shell.task([
    // 'nodemon server/app.js'
  // ]);
// });

// gulp.task('watchers', function() {
    gulp.watch('./client/*html', ['html']);  
    gulp.watch('./client/styles/**/*.scss', ['sass']);
    // gulp.watch('./client/Assets/**/*.scss', ['images']);
});
