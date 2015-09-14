/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject} from 'angular2/angular2';
import {AdminAuth} from '../auth/admin-auth';

// Annotation section
@Component({
    selector: 'admin-home'
})

@View({
    templateUrl: 'components/admin/home/admin-home.html',
    directives: [AdminAuth]
})

// Component controller
export class AdminHome {

    constructor() {
    }
}
