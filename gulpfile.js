var devEnv = process.env.NODE_ENV == 'development';

var gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache'),
    coffeelint = require('gulp-coffeelint'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    clean = require('gulp-clean'),
    streamqueue = require('streamqueue'),
    karma = require('karma').server,
    _ = require('lodash'),
    gulpif = require('gulp-if'),
    ngmin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    cp = require('child_process'),
    livereload = require('gulp-livereload');

var paths = {
    specs: ['spec/js/**/*.coffee'],
    posts: ['app/**/**', '!app/**/.#*.*'],
    templates: ['app/templates/**/*.html'],
    scripts: ['app/js/**/*.coffee'],
    sass: ['app/css/**/*.scss']
};

var karmaConf = {
    preprocessors: {
	'**/*.coffee': ['coffee'],
	'app/templates/**/*.html': ['ng-html2js']

    },
    ngHtml2JsPreprocessor: {
	stripPrefix: 'app/'
    },

    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
	'spec/helpers/*.js',
	'generated/js/app.js',
	'spec/js/**/*.coffee',
	'app/templates/**/*.html'
    ]
};

var vendor = [
    "vendor/js/jquery.js",
    "vendor/js/underscore.js",
    "vendor/js/mediaelement-and-player.min.js",
    "vendor/bower/angular/angular.js",
    "vendor/bower/angular-mocks/angular-mocks.js",
    "vendor/bower/angular-strap/dist/angular-strap.js",
    "vendor/bower/angular-strap/dist/angular-strap.tpl.js",
    "vendor/bower/angular-cookies/angular-cookies.js",
    "vendor/bower/masonry/dist/masonry.pkgd.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js",
    "vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js"
];

gulp.task('clean', function() {
    gulp.src('generated/js/*.*')
	.pipe(clean());
});

gulp.task('jekyll', function(cb){
    var bundle = cp.spawn('bundle', ['exec', 'jekyll', 'build', '--watch']);
    bundle.on('close', cb);
    bundle.stdout.on('data', function(data) {
	console.log('[jekyll] ', data.toString());
	livereload.changed('jekyll');
    });
});

gulp.task('mkdirs', function() {
    cp.exec('mkdir -p generated/js');
    cp.exec('mkdir -p generated/css');
});

gulp.task('coffee', function() {
    return streamqueue({ objectMode: true },
		       gulp.src(vendor),
		       gulp.src(paths.scripts)
		       .pipe(coffeelint())
		       .pipe(coffeelint.reporter())
		       .pipe(coffee().on('error', gutil.log)),
		       gulp.src(paths.templates)
		       .pipe(templateCache({standalone: true}))
		      )
	.pipe(concat('app.js'))
	.pipe(gulpif(!devEnv, ngmin()))
	.pipe(gulp.dest('generated/js'))
	.pipe(gulpif(devEnv, livereload()));
});

gulp.task('sass', function() {
    gulp.src('app/css/main.scss')
	.pipe(sass({sourcemap: false}))
    	.pipe(concat('app.css'))
	.pipe(gulpif(!devEnv, minifyCSS()))
	.pipe(gulp.dest('generated/css'))
	.pipe(gulpif(devEnv, livereload()));
});

gulp.task('server', function() {
    nodemon({
	script: './server/server.js',
	ignore: ['app/','_site/','config/','generated/','spec/','tmp/','vendor/']
    });
    livereload.listen();
});


gulp.task('karma', ['coffee'], function(done) {
    return karma.start(_.assign({}, karmaConf, {singleRun: true}), done);
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['clean', 'coffee']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('spec-watch', function() {
    gulp.watch(paths.specs, ['clean', 'coffee', 'karma']);
    gulp.watch(paths.scripts, ['clean', 'coffee', 'karma']);
});

gulp.task('test', ['clean', 'karma', 'spec-watch']);
gulp.task('ci', ['clean', 'karma']);
gulp.task('dev', ['clean', 'coffee', 'sass', 'jekyll', 'server', 'watch']);
gulp.task('build', ['clean', 'jekyll', 'coffee', 'sass']);
gulp.task('default', ['dev']);
