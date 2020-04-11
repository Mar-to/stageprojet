const gulp = require('gulp'),
    merge = require('merge-stream'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gzip = require('gulp-gzip'),
    del = require('del'),
    workboxBuild = require('workbox-build');

gulp.task('scriptsHome', ['cleanJs'], () => {
  return gulp.src(['assets/js/home.js'])
    .pipe(concat('home.js'))
    .pipe(gulp.dest('web/js'));
});

gulp.task('scriptsExternalPages', ['cleanJs'], () => {
  return gulp.src(['assets/js/api/**/*.js', 'assets/js/duplicates/**/*.js'])
    .pipe(concat('external-pages.js'))
    .pipe(gulp.dest('web/js'));
});

gulp.task('scriptsElementForm', ['cleanJs'], () => {
  return gulp.src(['assets/js/element-form/**/*.js'])
    .pipe(concat('element-form.js'))
    .pipe(gulp.dest('web/js'));
});

gulp.task('scriptsLibs', ['cleanJs'], () => {
  const gogocarto = gulp.src(['node_modules/gogocarto-js/dist/gogocarto.js'])
    .pipe(gulp.dest('web/js'));
  const sw = gulp.src(['assets/js/vendor/**/*', 'assets/js/init-sw.js'])
    .pipe(gulp.dest('web/js'));
  return merge(gogocarto, sw);
});

gulp.task('service-worker', ['sass', 'scriptsLibs', 'scriptsHome', 'scriptsExternalPages', 'scriptsElementForm', 'gogocarto_assets'], async () => {
  const { count, size, warnings } = await workboxBuild.injectManifest({
    swSrc: 'assets/js/sw.js',
    swDest: 'web/sw.js',
    globDirectory: 'web',
    globPatterns: [
      '+(fonts|img|js|css)\/**\/*.{js,css,html,png,woff,woff2}',
      'offline.html'
    ],
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
  });
  // Optionally, log any warnings and details.
  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);
});

gulp.task('sass', [], () => {
  const vendor = gulp.src(['assets/scss/vendor/*.css']).pipe(gulp.dest('web/css'));
  const scss = gulp.src(['assets/scss/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('web/css'));
  return merge(vendor, scss);
});

gulp.task('gogocarto_assets', ['cleanJs'], () => {
  const js = gulp.src(['node_modules/gogocarto-js/dist/*.css*',])
    .pipe(gulp.dest('web/css'));
  const fonts = gulp.src(['node_modules/gogocarto-js/dist/fonts/**/*',])
    .pipe(gulp.dest('web/css/fonts'));
  const images = gulp.src(['node_modules/gogocarto-js/dist/images/**/*'])
    .pipe(gulp.dest('web/css/images'));
  return merge(js, fonts, images);
});

gulp.task('prod_styles', () => {
  return gulp.src('web/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('web/css'));
});

gulp.task('gzip_styles', ['prod_styles'], () => {
  return gulp.src('web/css/**/*.css!(.gz)')
    .pipe(gzip())
    .pipe(gulp.dest('web/css'));
});

gulp.task('prod_js', () => {
  return gulp.src(['web/js/!(*.min)*.js', '!web/js/external-pages.js']) // external page use a lib that fail to be minified
    .pipe(uglify())
    .pipe(uglify().on('error', (uglify) => {
      console.error(uglify.message);
      this.emit('end');
    }))
    .pipe(gulp.dest('web/js'));
});

gulp.task('gzip_js', ['prod_js'], () => {
  return gulp.src(['web/js/**/*.js!(.gz)'])
    .pipe(gzip())
    .pipe(gulp.dest('web/js'));
});

gulp.task('watch', () => {
  // Watch .scss files
  gulp.watch(['assets/scss/**/*.scss'],['sass', 'service-worker']);

  gulp.watch(['assets/js/element-form/**/*.js'],
              ['scriptsElementForm']);

  gulp.watch(['assets/js/**/*.js', '!assets/js/element-form/**/*.js'],
              ['scriptsExternalPages']);

  gulp.watch(['node_modules/gogocarto-js/dist/**/*'],
              ['gogocarto_assets']);

  gulp.watch(['assets/js/vendor/**/*.js','node_modules/gogocarto-js/dist/gogocarto.js'], ['scriptsLibs']);

  gulp.watch(['assets/js/home.js'], ['scriptsHome']);
});

gulp.task('cleanCss', () => {
  return del(['web/css']);
});

gulp.task('cleanJs', () => {
  return del(['web/js']);
});

gulp.task('build', ['sass', 'scriptsLibs', 'scriptsHome', 'scriptsExternalPages', 'scriptsElementForm', 'gogocarto_assets', 'service-worker']);

gulp.task('production', ['gzip_styles', 'gzip_js']);
