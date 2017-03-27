var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   less = require('gulp-less'),
   concat = require('gulp-concat'),
   watch = require('gulp-watch');   

gulp.task('minify-js', function () {
   gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('assets'))
});

gulp.task('less', function() {
   watch('src/css/*.less')
      .pipe(less())
      .pipe(gulp.dest('assets/css'));
      //.pipe(livereload());
});