/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, NgIf} from 'angular2/angular2';
import {RouterLink, Router} from 'angular2/router';

interface IChild {
    name: String;
    path: String;
    params?: Object;
}

interface IItem {
    isActive: boolean;
    name: String;
    path?: String;
    children?: Array<IChild>;
}

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

    items: Array<IItem>;

    constructor(private router: Router) {
        this.items = [{
            isActive: true,
            name: 'Dashboard',
            path: '/admin/dashboard'
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Upload',
                path: '/admin/uploadPhoto',
                params: {
                    id: null
                }
            }],
            name: 'Photos',
            isActive: false
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/listPhotos'
            }],
            name: 'Album',
            isActive: false
        }, {
            children: [{
                name: 'List',
                path: '/admin/listCategories'
            }, {
                name: 'Create',
                path: '/admin/categories'
            }],
            name: 'Categories',
            isActive: false
        }, {
            children: [{
                name: 'List',
                path: '/admin/listTags'
            }, {
                name: 'Create',
                path: '/admin/tags'
            }],
            name: 'Tags',
            isActive: false
        }, {
            children: [{
                name: 'List',
                path: '/admin/listPhotos'
            }, {
                name: 'Create',
                path: '/admin/listPhotos'
            }],
            name: 'Setups',
            isActive: false
        }];
    }

    onClick(item) {

        this.items.forEach((it: IItem) => {
            it.isActive = false;
        });

        item.isActive = true;

        if (item.path) {
            this.router.navigate(item.path);
        }
    }
}
