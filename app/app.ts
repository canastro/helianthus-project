// Angular2
import {bootstrap, Component, View} from 'angular2/angular2';

// Angular2 Router Injectables https://github.com/angular/angular/blob/f999d5a1566d3b830fd1a23ed554cbed4e1215e8/modules/angular2/router.ts
import {ROUTER_BINDINGS, RouteConfig, RouterOutlet} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import {CategoriesService} from './services/categories';
import {TagsService} from './services/tags';
import {PhotosService} from './services/photos';
import {AuthService} from './services/auth';
import {ContactService} from './services/contact';
import {CommentsService} from './services/comments';
import {SetupsService} from './services/setups';
import {AlbumsService} from './services/albums';


import {NavBar} from './components/navbar/navbar';
import {Home} from './components/home/index/index';
import {About} from './components/about/index/index';
import {Photo} from './components/photo/index/index';
import {Admin} from './components/admin/index/index';

// Annotation section
@Component({
  selector: 'app'
})

@View({
    templateUrl: './app.html',
    directives: [RouterOutlet, NavBar]
})

@RouteConfig([
    { path: '/', as: 'home', component: Home },
    { path: '/about', as: 'about', component: About },
    { path: '/photo/:id', as: 'photo', component: Photo },
    { path: '/admin/...', as: 'admin', component: Admin }
])

// Component controller
class App {
}

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
    ContactService,
    CommentsService,
    SetupsService,
    AlbumsService
]);
