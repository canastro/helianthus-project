/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgFor, NgIf} from 'angular2/angular2';

import {ROUTER_DIRECTIVES, RouterLink} from 'angular2/router';

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

    items: Array<Object>;

    constructor() {
        this.items = [{
            name: 'Dashboard',
            path: '/admin/dashboard'
        }, {
            name: 'Categories',
            path: '/admin/categories'
        }, {
            name: 'Tags',
            path: '/admin/tags'
        }, {
            name: 'Photos',
            items: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: 'admin/createPhoto'
            }]
        }, {
            name: 'Setups',
            path: '/admin/photos'
        }];
    }

    onClick(item) {
        console.log(item);
    }
}
