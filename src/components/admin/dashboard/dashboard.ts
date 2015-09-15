/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

// Annotation section
@Component({
    selector: 'dashboard'
})

@View({
  templateUrl: 'components/admin/dashboard/dashboard.html',
  directives: [NgFor, RouterLink]
})

// Component controller
export class Dashboard {
    items: Array<Object>;

    constructor() {
        this.items = [{
            name: 'Categories',
            path: '/admin/categories'
        }, {
            name: 'Tasks',
            path: '/admin/tasks'
        }, {
            name: 'Photos',
            path: '/admin/photos'
        }];
    }
}
