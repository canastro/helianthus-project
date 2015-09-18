/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {NavBar} from '../navbar/navbar';
import {Home} from '../home/home';
import {About} from '../about/about';
import {Contact} from '../contact/contact';
import {Photo} from '../photo/photo';
import {Admin} from '../admin/admin/admin';
import {Router, RouterOutlet} from 'angular2/router';

// Annotation section
@Component({
  selector: 'hellianthus-app'
})

@View({
    templateUrl: 'components/app/app.html',
    directives: [RouterOutlet, NavBar]
})

// Component controller
export class App {

    constructor(router: Router) {
        router.config([
            { path: '/', as: 'home', component: Home },
            { path: '/about', as: 'about', component: About },
            { path: '/contact', as: 'contact', component: Contact },
            { path: '/photo/:id', as: 'photo', component: Photo },
            { path: '/admin/...', as: 'admin', component: Admin }
        ]);
    }
}
