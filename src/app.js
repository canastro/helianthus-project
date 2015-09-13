/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/angular2/http.d.ts" />
/// <reference path="../typings/angular2/router.d.ts" />
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var app_1 = require('./components/app/app');
angular2_1.bootstrap(app_1.App, [router_1.ROUTER_BINDINGS, http_1.HTTP_BINDINGS]);
