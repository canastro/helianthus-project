/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor} from 'angular2/angular2';

import {HpLoadMore} from '../../directives/hp-load-more';

import {PhotosService} from '../../services/photos';
import {RouterLink} from 'angular2/router';

// Annotation section
@Component({
    selector: 'gallery'
})

@View({
    directives: [RouterLink, NgFor, HpLoadMore],
    templateUrl: 'components/gallery/gallery.html'
})

// Component controller
export class Gallery {

    photos: Array<any> = [];

    constructor(private photosService: PhotosService) {
        this.getPhotos();
    }

    getPhotos() {

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
