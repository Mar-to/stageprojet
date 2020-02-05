var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    gzip = require('gulp-gzip'),
    del = require('del'),
    notifier = require('node-notifier'),
    workboxBuild = require('workbox-build');

gulp.task("scriptsHome", function () {
   return gulp.src(['assets/js/home.js'])
    .pipe(concat('home.js'))
    .pipe(gulp.dest('web/js'));
});

gulp.task("scriptsExternalPages", function () {
   return gulp.src(['assets/js/api/**/*.js', 'assets/js/duplicates/**/*.js'])
    .pipe(concat('external-pages.js'))
    .pipe(gulp.dest('web/js'));
});

gulp.task('scriptsElementForm', function() {
  return gulp.src(['assets/js/element-form/**/*.js'])
    .pipe(concat('element-form.js'))
    .pipe(gulp.dest('web/js'));
});

gulp.task('scriptsLibs', function() {
  gulp.src(['node_modules/gogocarto-js/dist/gogocarto.js'])
      .pipe(gulp.dest('web/js'));
  return gulp.src(['assets/js/vendor/**/*',
                   'assets/js/init-sw.js',
                   ])
    .pipe(gulp.dest('web/js'));
});

gulp.task('service-worker', () => {
    return workboxBuild.injectManifest({
        swSrc: 'assets/js/sw.js',
        swDest: 'web/sw.js',
        globDirectory: 'web',
        globPatterns: [
            '+(fonts|img|js|css)\/**\/*.{js,css,html,png,woff,woff2}',
            'offline.html'
        ],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
    }).then(({count, size, warnings}) => {
        // Optionally, log any warnings and details.
        warnings.forEach(console.warn);
        console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
});

gulp.task('sass', function () {
  gulp.src(['assets/scss/vendor/*.css']).pipe(gulp.dest('web/css'));
  return gulp.src(['assets/scss/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('web/css'));
});

gulp.task('gogocarto_assets', function() {
    gulp.src(['node_modules/gogocarto-js/dist/*.css*',])
     .pipe(gulp.dest('web/css'));
     gulp.src(['node_modules/gogocarto-js/dist/fonts/**/*',])
     .pipe(gulp.dest('web/css/fonts'));
     gulp.src(['node_modules/gogocarto-js/dist/images/**/*'])
     .pipe(gulp.dest('web/css/images'));
});

gulp.task('prod_styles' ,function() {
  return gulp.src('web/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('web/css'));
});

gulp.task('gzip_styles', ['prod_styles'], function() {
  return gulp.src('web/css/**/*.css!(.gz)')
    .pipe(gzip())
    .pipe(gulp.dest('web/css'));
});

gulp.task('prod_js', function() {
  return gulp.src(['web/js/!(*.min)*.js', '!web/js/external-pages.js']) // externalm page use a lib that fail to be minified
    .pipe(uglify())
    .pipe(uglify().on('error', function(uglify) {
        console.error(uglify.message);
        this.emit('end');
    }))
    .pipe(gulp.dest('web/js'));
});

gulp.task('gzip_js', ['prod_js'],  function() {
  return gulp.src(['web/js/**/*.js!(.gz)'])
    .pipe(gzip())
    .pipe(gulp.dest('web/js'));
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch(['src/Biopen/**/Resources/scss/**/*.scss'],['sass']);

  gulp.watch(['assets/js/element-form/**/*.js'],
              ['scriptsElementForm']);

  gulp.watch(['assets/js/**/*.js', '!assets/js/element-form/**/*.js'],
              ['scriptsExternalPages']);

  gulp.watch(['node_modules/gogocarto-js/dist/**/*'],
              ['gogocarto_assets']);

  gulp.watch(['assets/js/vendor/**/*.js','node_modules/gogocarto-js/dist/gogocarto.js'], ['scriptsLibs']);

  gulp.watch(['assets/js/home.js'], ['scriptsHome']);
});

gulp.task('clean', function(cb) {
    del(['web/css', 'web/js'], cb);
});

gulp.task('build', function() {
    gulp.start('clean','sass', 'scriptsLibs', 'scriptsHome', 'scriptsExternalPages', 'scriptsElementForm', 'gogocarto_assets', 'service-worker');
});

gulp.task('production', function() {
    gulp.start('gzip_styles', 'gzip_js');
});

