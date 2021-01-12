const gulp = require('gulp'),
    merge = require('merge-stream'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gzip = require('gulp-gzip'),
    del = require('del'),
    workboxBuild = require('workbox-build');

const scriptsHome = () =>
  gulp.src(['assets/js/home.js'])
    .pipe(concat('home.js'))
    .pipe(gulp.dest('web/js'));

const scriptsExternalPages = () =>
  gulp.src(['assets/js/api/**/*.js', 'assets/js/duplicates/**/*.js'])
    .pipe(concat('external-pages.js'))
    .pipe(gulp.dest('web/js'));

const scriptsElementForm = () =>
  gulp.src(['assets/js/element-form/**/*.js', 'node_modules/universal-geocoder/dist/universal-geocoder.js'])
    .pipe(concat('element-form.js'))
    .pipe(gulp.dest('web/js'));

const scriptsLibs = () => {
  const gogocarto = gulp.src(['node_modules/gogocarto-js/dist/gogocarto.js', 'assets/js/init-sw.js', 'custom/**/*.js'])
    .pipe(concat('gogocarto.js'))
    .pipe(gulp.dest('web/js'));
  const sw = gulp.src(['assets/js/vendor/**/*'])
    .pipe(gulp.dest('web/js'));
  return merge(gogocarto, sw);
};

const serviceWorker = async () => {
  const { count, size, warnings } = await workboxBuild.injectManifest({
    swSrc: 'assets/js/sw.js',
    swDest: 'web/sw.js',
    globDirectory: 'web',
    globPatterns: [
      '+(fonts|img|js|css)\/**\/*.{js,css,html,png,woff,woff2,ico}'
    ],
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
  });
  // Optionally, log any warnings and details.
  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);
};

const stylesBuild = () => {
  const vendor = gulp.src(['assets/scss/vendor/*.css']).pipe(gulp.dest('web/css'));
  const scss = gulp.src(['assets/scss/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('web/css'));
  return merge(vendor, scss);
};

const gogocarto_assets = () => {
  const js = gulp.src(['node_modules/gogocarto-js/dist/gogocarto.css', 'custom/**/*.css',])
    .pipe(concat('gogocarto.css'))
    .pipe(gulp.dest('web/css'));
  const fonts = gulp.src(['node_modules/gogocarto-js/dist/fonts/**/*',])
    .pipe(gulp.dest('web/css/fonts'));
  const images = gulp.src(['node_modules/gogocarto-js/dist/images/**/*'])
    .pipe(gulp.dest('web/css/images'));
  return merge(js, fonts, images);
};

const prod_styles = () =>
  gulp.src('web/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('web/css'));

const gzip_styles = () =>
  gulp.src('web/css/**/*.css!(.gz)')
    .pipe(gzip())
    .pipe(gulp.dest('web/css'));

const prod_js = () =>
  gulp.src(['web/js/!(*.min)*.js', '!web/js/external-pages.js']) // external page use a lib that fail to be minified
    .pipe(uglify())
    .pipe(uglify().on('error', (uglify) => {
      console.error(uglify.message);
      this.emit('end');
    }))
    .pipe(gulp.dest('web/js'));

const gzip_js = () =>
  gulp.src(['web/js/**/*.js!(.gz)'])
    .pipe(gzip())
    .pipe(gulp.dest('web/js'));

exports.watch = () => {
  // Watch .scss files
  gulp.watch(['assets/scss/**/*.scss'], gulp.series(stylesBuild, serviceWorker));

  gulp.watch(['assets/js/element-form/**/*.js'],
              gulp.series(scriptsElementForm, serviceWorker));

  gulp.watch(['assets/js/**/*.js', '!assets/js/element-form/**/*.js'],
              gulp.series(scriptsExternalPages, serviceWorker));

  gulp.watch(['node_modules/gogocarto-js/dist/**/*'],
              gulp.series(gogocarto_assets, serviceWorker));

  gulp.watch(['assets/js/vendor/**/*.js','assets/js/admin/**/*.js', 'node_modules/gogocarto-js/dist/gogocarto.js'],
              gulp.series(scriptsLibs, serviceWorker));

  gulp.watch(['assets/js/home.js'], gulp.series(scriptsHome, serviceWorker));
};

const cleanCss = () =>
  del(['web/css']);

const cleanJs = () =>
  del(['web/js']);

exports.build = gulp.series(cleanJs, cleanCss, gulp.parallel(stylesBuild, scriptsLibs, scriptsHome, scriptsExternalPages, scriptsElementForm, gogocarto_assets), serviceWorker);

exports.production = gulp.parallel(gulp.series(prod_styles, gzip_styles), gulp.series(prod_js, gzip_js));
