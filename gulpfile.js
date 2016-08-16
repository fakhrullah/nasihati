var gulp = require('gulp'),
	rename = require('gulp-rename'),
	// uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	cssnext = require('postcss-cssnext'),
	postCss = require('gulp-postcss'),
	postcssNested = require('postcss-nested');
    // maps   = require('gulp-sourcemaps'),
    // cleanDest = require('gulp-clean-dest');

gulp.task('build-css', function(){
	var processors = [
		cssnext(),
		postcssNested()
	];

	return gulp.src('_css/*.css')
		.pipe(concat('main.css'))
		.pipe(postCss(processors))
		.pipe(gulp.dest('public/css/'))
		.pipe(cssnano({
			discardComment:true
		}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('public/css/'));
})

// gulp.task('build-image', function(){
// 	// TODO resize and optimize

// 	return gulp.src('src/images/*')
// 		.pipe(cleanDest('public/images'))
// 		.pipe(gulp.dest('public/images'));
// })

// gulp.task('build-js', function(){
// 	return gulp.src(['src/js/*.js'])
// 	.pipe(concatJs('main.js'))
// 	.pipe(uglify())
// 	.pipe(rename('main.min.js'))
// 	.pipe(gulp.dest('public/js'));
// })

// // Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('_css/*.css', ['build-css']);
  // gulp.watch('src/js/*.js', ['build-js']);
});

gulp.task('default', ['watch',
	'build-css',
	// 'build-image',
	// 'build-js'
	]);