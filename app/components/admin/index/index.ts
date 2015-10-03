
import {
    Component,
    View
} from 'angular2/angular2';

import {Auth} from '../auth/auth';
import {AuthService} from '../../../services/auth';

import {SideNav} from '../sidenav/sidenav';
import {Dashboard} from '../dashboard/dashboard';
import {ListCategories} from '../category/list-categories/list-categories';
import {CreateCategory} from '../category/create-category/create-category';
import {ListTags} from '../tag/list-tags/list-tags';
import {CreateTag} from '../tag/create-tag/create-tag';
import {CreateSetup} from '../setup/create-setup/create-setup';
import {ListSetups} from '../setup/list-setups/list-setups';
import {ListPhotos} from '../photo/list-photos/list-photos';
import {CreatePhoto} from '../photo/create-photo/create-photo';
import {ListAlbums} from '../album/list-albums/list-albums';
import {CreateAlbum} from '../album/create-album/create-album';

import {ROUTER_DIRECTIVES, Router, RouteConfig} from 'angular2/router';

// Annotation section
@Component({
    selector: 'admin'
})

@View({
    directives: [ROUTER_DIRECTIVES, SideNav],
    templateUrl: 'components/admin/index/index.html'
})

@RouteConfig([
    { path: '/', redirectTo: '/admin' },
    { path: '/dashboard', as: 'dashboard', component: Dashboard },
    { path: '/auth', as: 'auth', component: Auth },
    { path: '/listCategories', as: 'listCategories', component: ListCategories },
    { path: '/categories', as: 'categories', component: CreateCategory },
    { path: '/listTags', as: 'listTags', component: ListTags },
    { path: '/tags', as: 'tags', component: CreateTag },
    { path: '/listSetups', as: 'listSetups', component: ListSetups },
    { path: '/createSetup', as: 'createSetup', component: CreateSetup },
    { path: '/listPhotos', as: 'listPhotos', component: ListPhotos },
    { path: '/createPhoto/:id', as: 'createPhoto', component: CreatePhoto },
    { path: '/listAbums', as: 'listAlbums', component: ListAlbums },
    { path: '/createAlbum/:id', as: 'createAlbum', component: CreateAlbum }
])

// Component controller
export class Admin {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {

    }

    isLogged() : boolean {
        return this.authService.isLogged();
    }
}
