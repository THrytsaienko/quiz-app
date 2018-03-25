var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var sass = require('gulp-sass');
var processors = [
	autoprefixer({browsers: ['last 2 version']})
];
var rename = require("gulp-rename");
var webpack = require('webpack-stream');


gulp.task('html', function(){
	return gulp.src('./index.html')
		.pipe(gulp.dest('docs'))
});

gulp.task('sass', function () {
	return gulp.src('./src/sass/*.sass')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('./docs/assets'))
		.pipe(browserSync.stream())
});

gulp.task('webpack', function () {
	return gulp.src('src/js/app.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('docs/assets'))
		.pipe(browserSync.stream());
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./docs"
		}
	});
});

var reload = function(done){
	browserSync.reload();
	done();
}

gulp.task('watch', function() {
	gulp.watch('./index.html', gulp.series('html', reload));
	gulp.watch('./src/sass/*.sass', gulp.series('sass'));
});

gulp.task('copy', function(){
	return gulp.src([
			'src/assets/**/*.{jpg,png,jpeg,gif}'
		])
		.pipe(gulp.dest('./docs/assets'))
});

gulp.task('clean', function() {
	return del('docs');
});

gulp.task('build', gulp.parallel('html', 'sass', 'copy'));

gulp.task('start', gulp.parallel('webpack', 'watch', 'serve'));

gulp.task('default', gulp.series('clean', 'build', 'start'));