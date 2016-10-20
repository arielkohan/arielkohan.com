'use strict';

var gulp = require('gulp'),
	gulpConcat = require('gulp-concat'),
	gulpUglify = require('gulp-uglify'),
	gulpRename = require('gulp-rename'),
	gulpSass = require ('gulp-sass'),
	gulpMaps = require('gulp-sourcemaps'),
	gulpCleanCss = require('gulp-clean-css'),
	del = require('del');

gulp.task("concatScripts", function(){
	return gulp.src([	'js/jquery-2.2.4.min.js',
				'js/bootstrap.min.js',
				'js/TweenMax.min.js',
				'js/ScrollToPlugin.min.js',
				'js/wow.min.js',
				'js/main.js',
				'js/classie.js',
				'js/modernizr.custom.js',
				'js/dialogFx.js',
				'js/init-dialog.js',
				'js/input.js'
		])	
			.pipe(gulpMaps.init())
			.pipe(gulpConcat("app.js"))
			.pipe(gulpMaps.write("./"))
			.pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function(){
	return gulp.src("js/app.js")
		.pipe(gulpUglify())
		.pipe(gulpRename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
	return gulp.src("scss/main.scss")
	.pipe(gulpMaps.init())
	.pipe(gulpSass())
	.pipe(gulpMaps.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task("minifyCss", ["compileSass"], function(){
	return gulp.src("css/main.css")
		.pipe(gulpCleanCss({compatibility: 'ie8'}))
		.pipe(gulpRename("main.min.css"))
    	.pipe(gulp.dest('css'));
});

gulp.task("watchFiles", function(){
		 gulp.watch('scss/**/*.scss', ['minifyCss']);
		 gulp.watch('js/main.js',['minifyScripts']);
});

gulp.task("clean", function(){
	return del(['dist', 'css/main*.css*', 'js/app*.js*']);
});

gulp.task("build",['minifyScripts', 'minifyCss'], function(){
	return gulp.src(["css/main.min.css", "css/animate.min.css", "js/app.min.js", 'index.html', 'CNAME',
					 "img/**", "fonts/**", "*.png", "*.ico","manifest.json", "browserconfig.xml",
					 "safari*.svg"], { base: './' })
			.pipe(gulp.dest('dist'));
});

gulp.task("serve", ["watchFiles"]);

gulp.task("default", ["clean"], function(){
	gulp.start('build');
});