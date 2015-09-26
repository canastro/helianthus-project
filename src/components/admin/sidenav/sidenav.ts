/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {RouterLink, Router} from 'angular2/router';

// annotation section
@Component({
    selector: 'side-nav'
})

@View({
    directives: [NgFor, NgIf, RouterLink],
    templateUrl: 'components/admin/sidenav/sidenav.html'
})

// component controller
export class SideNav {

    items: Array<any>;

    constructor(private router: Router) {
        this.items = [{
            active: true,
            name: 'Dashboard',
            path: '/admin/dashboard'
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Upload',
                path: '/admin/uploadPhoto'
            }],
            name: 'Photos'
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/uploadPhoto'
            }],
            name: 'Album'
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/categories'
            }],
            name: 'Categories'
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/tags'
            }],
            name: 'Tags'
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/listPhotos'
            }],
            name: 'Setups'
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
