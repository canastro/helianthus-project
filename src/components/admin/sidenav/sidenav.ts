/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgFor, NgIf} from 'angular2/angular2';

import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

// Annotation section
@Component({
    selector: 'side-nav'
})

@View({
    templateUrl: 'components/admin/sidenav/sidenav.html',
    directives: [NgFor, NgIf, RouterLink]
})

// Component controller
export class SideNav {

    items: Array<any>;

    constructor(private router: Router) {
        this.items = [{
            active: true,
            name: 'Dashboard',
            path: '/admin/dashboard'
        }, {
            name: 'Photos',
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Upload',
                path: '/admin/uploadPhoto'
            }]
        }, {
            name: 'Album',
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/uploadPhoto'
            }]
        }, {
            name: 'Categories',
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/categories'
            }]
        }, {
            name: 'Tags',
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/tags'
            }]
        }, {
            name: 'Setups',
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/listPhotos'
            }]
        }];
    }

    onClick(item) {

        this.items.forEach((it) => {
            it.active = false;
        });

        item.active = true;

        if (item.path) {
            this.router.navigate(item.path);
        }
    }
}
