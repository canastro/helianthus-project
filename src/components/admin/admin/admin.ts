/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {
    Component,
    View
} from 'angular2/angular2';

import {Auth} from '../auth/auth';
import {AuthService} from '../../../services/auth';

import {SideNav} from '../sidenav/sidenav';
import {Dashboard} from '../dashboard/dashboard';
import {ListCategories} from '../list-categories/list-categories';
import {CreateCategory} from '../create-category/create-category';
import {ListTags} from '../list-tags/list-tags';
import {CreateTag} from '../create-tag/create-tag';
import {CreateSetup} from '../create-setup/create-setup';
import {ListSetups} from '../list-setups/list-setups';
import {ListPhotos} from '../list-photos/list-photos';
import {CreatePhoto} from '../create-photo/create-photo';

import {ROUTER_DIRECTIVES, Router, RouteConfig} from 'angular2/router';

// Annotation section
@Component({
    selector: 'admin'
})

@View({
    directives: [ROUTER_DIRECTIVES, SideNav],
    templateUrl: 'components/admin/admin/admin.html'
})

@RouteConfig([
    { path: '/', redirectTo: '/admin' },
    { path: '/dashboard', as: 'dashboard', component: Dashboard },
    { path: '/auth', as: 'auth', component: Auth },
    { path: '/listCategories', as: 'listCategories', component: ListCategories },
    { path: '/categories', as: 'categories', component: CreateCategory },
    { path: '/listTags', as: 'listTags', component: ListTags },
    { path: '/tags', as: 'tags', component: CreateTag },
    { path: '/listSetups', as: 'listSetups', component: ListSetups },
    { path: '/createSetup', as: 'createSetup', component: CreateSetup },
    { path: '/listPhotos', as: 'listPhotos', component: ListPhotos },
    { path: '/createPhoto/:id', as: 'createPhoto', component: CreatePhoto }
])

// Component controller
export class Admin {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {

    }

    isLogged() : boolean {
        return this.authService.isLogged();
    }
}
