/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {
    FormBuilder,
    Component,
    View,
    NgFor
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouterLink} from 'angular2/router';

import {IPhoto} from '../../../interfaces/photo';
import {PhotosService} from '../../../services/photos';
import {HpLoadMore} from '../../../directives/hp-load-more';

// annotation section
@Component({
    selector: 'photos',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [ROUTER_DIRECTIVES, RouterLink, NgFor, HpLoadMore],
    templateUrl: 'components/admin/photos/photos.html'
})

export class Photos {

    photos: Array<IPhoto>;

    constructor(
        private photosService: PhotosService
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
}
