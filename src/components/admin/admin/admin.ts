/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgIf} from 'angular2/angular2';

import {Auth} from '../auth/auth';
import {AuthService} from '../../../services/auth';

import {Dashboard} from '../dashboard/dashboard';
import {CreateCategory} from '../create-category/create-category';
import {CreateTask} from '../create-task/create-task';
import {UploadPhoto} from '../upload-photo/upload-photo';

import {ROUTER_DIRECTIVES, Router, RouterOutlet, RouteConfig} from 'angular2/router';

// Annotation section
@Component({
    selector: 'admin'
})

@View({
    templateUrl: 'components/admin/admin/admin.html',
    directives: [ROUTER_DIRECTIVES, UploadPhoto]
})

@RouteConfig([
    { path: '/', redirectTo: '/admin' },
    { path: '/dashboard', as: 'dashboard', component: Dashboard },
    { path: '/auth', as: 'auth', component: Auth },
    { path: '/categories', as: 'categories', component: CreateCategory },
    { path: '/tasks', as: 'tasks', component: CreateTask },
    { path: '/photos', as: 'photos', component: UploadPhoto }
])

// Component controller
export class Admin {

    constructor(
        private router: Router,
        @Inject(AuthService) private authService: AuthService
    ) {

    }

    onInit () {
        if (this.authService.isLogged()) {
            this.router.navigate('/admin/dashboard').then(function () {
                console.log('success', arguments)
            }, function () {
                console.log('error', arguments)
            });
        } else {
            this.router.navigate('/admin/auth');
        }
    }

    isLogged() : boolean {
        return this.authService.isLogged();
    }
}
