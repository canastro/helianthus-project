/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/angular2/http.d.ts" />
/// <reference path="../typings/angular2/router.d.ts" />

// Angular2
import {bootstrap} from 'angular2/angular2';

// Angular2 Router Injectables https://github.com/angular/angular/blob/f999d5a1566d3b830fd1a23ed554cbed4e1215e8/modules/angular2/router.ts
import {ROUTER_BINDINGS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import {App} from './components/app/app';

import {CategoriesService} from './services/categories';
import {TagsService} from './services/tags';
import {PhotosService} from './services/photos';
import {AuthService} from './services/auth';
import {ContactService} from './services/contact';

// Second parameter provides a set of additional bindings
// that will be used by Component (in our case application)
// read more here: https://angular.io/docs/js/latest/api/core/bootstrap-function.html
bootstrap(App, [
    ROUTER_BINDINGS,
    HTTP_BINDINGS,
    CategoriesService,
    AuthService,
    TagsService,
    PhotosService,
    ContactService
]);
