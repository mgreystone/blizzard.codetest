'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var ghPages = require('gulp-gh-pages')
var clean = require('gulp-clean')
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config.js')

gulp.task('webpack', ['clean'], function (callback) {
  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString())

    callback()
  })
})

gulp.task('webpack-dev-server', function (callback) {
  var WebpackDevServer = require('webpack-dev-server')
  var compiler = webpack(config)

  new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'dist')
  })

    .listen(8080, 'localhost', function (err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err)
      }

      gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html')
    })
})

gulp.task('deploy', ['webpack'], function () {
  return gulp.src(path.join(__dirname, 'dist/**/*'))
    .pipe(ghPages())
})

gulp.task('clean', function () {
  return gulp.src(path.join(__dirname, 'dist'), { read: false })
    .pipe(clean())
})
