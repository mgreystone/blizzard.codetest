'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var ghPages = require('gulp-gh-pages')
var del = require('del')
var path = require('path')
var fs = require('fs')
var mkdirp = require('mkdirp')
var webpack = require('webpack')
var config = require('./webpack.config.js')

gulp.task('webpack', function (callback) {
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

gulp.task('deploy', ['build'], function () {
  return gulp.src(path.join(__dirname, 'dist/**/*'))
    .pipe(ghPages())
})

gulp.task('clean', function (callback) {
  del([ path.join(__dirname, 'dist') ])
  callback()
})

gulp.task('make-blank', function (callback) {
  var dist = path.join(__dirname, 'dist')

  mkdirp(dist, function (err) {
    if (err) {
      throw new gutil.PluginError('make-blank', err)
    }

    fs.closeSync(fs.openSync(path.join(dist, 'blank.txt'), 'w'))
    callback()
  })
})

gulp.task('build', ['webpack', 'make-blank'])
