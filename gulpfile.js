var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('clean', function() {
	return gulp.src(['dist/css', 'dist/js', 'dist/view', 'dist/app.html', 'dist/index.html'])
	.pipe(clean());
});

gulp.task('uglifybase', function() {
	return gulp.src(['app/js/vendor/jquery-3.2.1.js', 'app/js/vendor/angular.js', 'app/js/vendor/bootstrap.js', 'app/js/vendor/angular-locale_pt-br.js', 'app/js/vendor/raphael.js', 'app/js/vendor/morris.js', 'app/js/vendor/angular-morris.js', 'app/js/vendor/ui-bootstrap-2.5.0.js'])
	.pipe(concat('base.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('uglifyapp', function() {
	return gulp.src('app/js/custom/**/*.js')
	.pipe(concat('app.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(reload({stream: true}));
});

gulp.task('cssbase', function() {
	return gulp.src('app/stylesheet/vendor/**/*.css')
	.pipe(cleanCSS())
	.pipe(concat('base.css'))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('cssapp', function() {
	return gulp.src('app/stylesheet/custom/**/*.css')
	.pipe(concat('app.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('app/view/**/*.html')
	.pipe(gulp.dest('dist/view'))
	.pipe(reload({stream: true}));
});

gulp.task('copyindex', function() {
	return gulp.src(['app/index-prod.html'])
	.pipe(rename('index.html'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('copyapp', function() {
	return gulp.src('app/app.html')
	.pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });

    gulp.watch("app/view/**/*.html").on("change", function() {
    	gulp.run('html')
	});

    gulp.watch("app/js/**/*.js").on("change", function() {
    	gulp.run('uglifyapp')
	});

    gulp.watch("app/stylesheet/**/*.css").on("change", function() {
    	gulp.run('cssapp')
	});
});

gulp.task('serve', function() {
	return runSequence('clean', ['uglifybase', 'uglifyapp', 'cssbase', 'cssapp', 'html', 'copyapp', 'copyindex', 'browser-sync']);
});
