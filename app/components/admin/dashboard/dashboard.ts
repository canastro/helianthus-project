
import {Component, View, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

// annotation section
@Component({
    selector: 'dashboard'
})

@View({
    directives: [NgFor, RouterLink],
    templateUrl: 'components/admin/dashboard/dashboard.html'
})

// component controller
export class Dashboard {
    items: Array<Object>;

    constructor() {
        this.items = [{
            name: 'Categories',
            path: '/admin/categories'
        }, {
            name: 'Tags',
            path: '/admin/tags'
        }, {
            name: 'Photos',
            path: '/admin/photos'
        }];
    }
}
