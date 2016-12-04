var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var clean = require('gulp-clean');

gulp.task('less', function() {
  	return gulp.src('./Less/style/less/*.less')
  			.pipe(less({
  				paths: [path.join(__dirname, 'Less','style')]
  			}))
  			.pipe(gulp.dest('./Less/style/css'));
});

gulp.task('clean', function(){
	return gulp.src(['./Less/style/less'])
			.pipe(clean());
})

gulp.task('watch',function(){
	gulp.watch('./Less/style/less/*.less', ['less']);
})