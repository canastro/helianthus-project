/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgFor} from 'angular2/angular2';

import {Pagination} from '../pagination/pagination';

import {PhotosService} from '../../services/photos';
import {RouterLink} from 'angular2/router';

// Annotation section
@Component({
  selector: 'gallery'
})

@View({
  templateUrl: 'components/gallery/gallery.html',
  directives: [RouterLink, NgFor, Pagination]
})

// Component controller
export class Gallery {

    nTotalPages: number = 0;
    perPage: number = 12;
    page: number = 1;
    hasMore: boolean = false;
    photos: Array<any>;

    constructor(private photosService: PhotosService) {
        this.getPhotosCount();
        this.getPhotos();
    }

    getPhotos() {
        this.photosService.getPhotos(this.perPage, this.page)
            .subscribe(result => {
                this.photos = result.photos;
                this.hasMore = result.hasMore;
            });
    }

    getPhotosCount() {

        this.photosService.getPhotosCount()
            .subscribe(result => {
                this.nTotalPages = Math.ceil(result / this.perPage);
            });
    }

    pageSelected($event) {

        this.page = $event;
        this.getPhotos();
    }
}
