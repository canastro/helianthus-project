/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgFor} from 'angular2/angular2';

import {HpLoadMore} from '../../directives/hp-load-more';

import {PhotosService} from '../../services/photos';
import {RouterLink} from 'angular2/router';

// Annotation section
@Component({
  selector: 'gallery'
})

@View({
  templateUrl: 'components/gallery/gallery.html',
  directives: [RouterLink, NgFor, HpLoadMore]
})

// Component controller
export class Gallery {

    hasMore: boolean = true;
    photos: Array<any> = [];

    constructor(private photosService: PhotosService) {
        this.getPhotos();
    }

    getPhotos() {

        this.photosService.getPhotos()
            .subscribe(result => {
                this.photos = result;
                // this.hasMore = result.hasMore;
            });
    }

    loadMore() {

        if (!this.hasMore) {
            return;
        }

        this.photosService.loadMore(null)
            .subscribe(result => {
                this.photos = result;
                // this.hasMore = result.hasMore;
            });
    }
}
