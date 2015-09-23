/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor} from 'angular2/angular2';
import {AuthService} from '../../services/auth';

import {RouterLink, Router} from 'angular2/router';

// Annotation section
@Component({
  selector: 'navbar'
})

@View({
  templateUrl: 'components/navbar/navbar.html',
  directives: [NgFor, RouterLink]
})

// Component controller
export class NavBar {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    goToAdmin() {
        if (this.authService.isLogged()) {
            this.router.navigate('/admin/dashboard');
        } else {
            this.router.navigate('/admin/auth');
        }
    }
}
