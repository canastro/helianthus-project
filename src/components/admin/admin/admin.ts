/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {
    Component,
    View
} from 'angular2/angular2';

import {Auth} from '../auth/auth';
import {AuthService} from '../../../services/auth';

import {SideNav} from '../sidenav/sidenav';
import {Dashboard} from '../dashboard/dashboard';
import {CreateCategory} from '../create-category/create-category';
import {CreateTag} from '../create-tag/create-tag';
import {Photos} from '../photos/photos';
import {UploadPhoto} from '../upload-photo/upload-photo';

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
    { path: '/categories', as: 'categories', component: CreateCategory },
    { path: '/tags', as: 'tags', component: CreateTag },
    { path: '/listPhotos', as: 'listPhotos', component: Photos },
    { path: '/uploadPhoto', as: 'uploadPhoto', component: UploadPhoto }
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
