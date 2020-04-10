'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');

var webpack = require('webpack-stream');

gulp.task('css', function () {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'refresh'));
  gulp.watch('source/img/**/*.{png,jpg,svg}', gulp.series('copy', 'refresh'));
});

gulp.task('js', () => {
  const entry = ['main', 'vendor'].reduce((acc, el) => {
    acc[el] = `./source/js/${el}.js`;
    return acc;
  }, {});

  return gulp
    .src('./source/js/')
    .pipe(
      webpack({
        entry,
        mode: 'development',
        output: {
          filename: '[name].js',
        },
        watch: false,
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: 'usage',
                      },
                    ],
                  ],
                  plugins: [
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-async-to-generator',
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest('./build/js'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp
    .src('source/img/**/*.{svg}')
    .pipe(imagemin([imagemin.svgo()]))

    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp
    .src('source/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp
    .src('source/img/*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp
    .src('source/*.html')
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp
    .src(
      [
        'source/fonts/**/*.{woff,woff2}',
        'source/img/**/*.{webp,jpg,png}',
        'source//*.ico',
      ],
      {
        base: 'source',
      }
    )
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'js', 'sprite', 'html'));
gulp.task('start', gulp.series('build', 'server'));
