/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {
    FormBuilder,
    Component,
    View,
    NgFor
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

import {IPhoto} from '../../../interfaces/photo';
import {PhotosService} from '../../../services/photos';
import {HpLoadMore} from '../../../directives/hp-load-more';

// annotation section
@Component({
    selector: 'list-photos',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [ROUTER_DIRECTIVES, RouterLink, NgFor, HpLoadMore],
    templateUrl: 'components/admin/list-photos/list-photos.html'
})

export class ListPhotos {

    photos: Array<IPhoto>;

    constructor(
        private photosService: PhotosService,
        private router: Router
    ) {

        this.photosService.getPhotos()
            .subscribe(result => {
                this.photos = result;
            });
    }

    loadMore() {

        this.photosService.loadMore(null)
            .subscribe(result => {
                this.photos = result;
            });
    }

    selectPhoto(photo: IPhoto) {
        this.router.navigate(`/admin/uploadPhoto/${photo._id}`);
    }
}
