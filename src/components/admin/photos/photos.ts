/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {
    FORM_DIRECTIVES,
    FormBuilder,
    Component,
    View,
    Validators,
    ControlGroup,
    Inject,
    EventEmitter,
    NgFor
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouterLink, RouteConfig} from 'angular2/router';

import {PhotosService} from '../../../services/photos';
import {UploadPhoto} from '../upload-photo/upload-photo';

// Annotation section
@Component({
    selector: 'photos',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/admin/photos/photos.html',
  directives: [ROUTER_DIRECTIVES, RouterLink, NgFor]
})


@RouteConfig([
    { path: '/create', as: 'create', component: UploadPhoto }
])

export class Photos {

    perPage: number = 12;
    page: number = 1;
    photos: Array<any>;

    constructor(
        @Inject(PhotosService) private photosService: PhotosService
    ) {

        this.photosService.getPhotos(this.perPage, this.page)
            .subscribe(result => {
                this.photos = result;
            });
    }
}
