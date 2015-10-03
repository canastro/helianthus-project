
import {Component, View, NgFor} from 'angular2/angular2';
import {AuthService} from '../../services/auth';

import {RouterLink, Router, Location} from 'angular2/router';

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
        private location: Location,
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

     getLinkStyle(path) {

        if (!path && !this.location.path()) {
            return true;
        }

        return this.location.path().indexOf(path) !== -1;
    }
}
