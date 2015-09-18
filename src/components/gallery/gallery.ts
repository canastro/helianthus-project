/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgFor} from 'angular2/angular2';
import {PhotosService} from '../../services/photos';
import {RouterLink} from 'angular2/router';

// Annotation section
@Component({
  selector: 'gallery'
})

@View({
  templateUrl: 'components/gallery/gallery.html',
  directives: [RouterLink, NgFor]
})

// Component controller
export class Gallery {

    photos: Array<any>;

    constructor(private photosService: PhotosService) {
        this.getPhotos();
    }

    getPhotos() {
        this.photosService.getPhotos()
            .subscribe(result => {
                this.photos = result;
            });
    }
}
