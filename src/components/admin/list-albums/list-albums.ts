/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {
    FormBuilder,
    Component,
    View,
    NgFor
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

import {IAlbum} from '../../../interfaces/album';
import {AlbumsService} from '../../../services/albums';

// annotation section
@Component({
    selector: 'list-albums',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [ROUTER_DIRECTIVES, RouterLink, NgFor],
    templateUrl: 'components/admin/list-albums/list-albums.html'
})

export class ListAlbums {

    albums: Array<IAlbum>;

    constructor(
        private albumsService: AlbumsService,
        private router: Router
    ) {
        this.get();
    }

    get() {
        this.albumsService.get()
            .subscribe(result => {
                this.albums = result;
            });
    }

    delete() {
        console.log('delete');
    }
}
