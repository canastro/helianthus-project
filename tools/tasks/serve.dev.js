"use strict";

var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');
var historyApiFallback = require('connect-history-api-fallback');

var CONFIG = require('../workflow.config');
var PATH = CONFIG.PATH;
var path = require('path');
var join = path.join;

module.exports = function (gulp, plugins) {
  return function () {

  	connect.server({
  		root: 'dist/dev',
  		port: 8000,
  		host: '0.0.0.0',
  		livereload: true,
  		middleware: function() {
  			return [
  				modRewrite([
  					'^/api/(.*)$ http://localhost:8080/api/$1 [P]',
  					'^/static/(.*)$ http://localhost:8080/static/$1 [P]',
  				]),
  				historyApiFallback()
  			];
  		}
  	});

  }
};
