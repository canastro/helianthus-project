
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Component,
    View
} from 'angular2/angular2';

import {RouteParams} from 'angular2/router';
import {AlbumsService} from '../../../../services/albums';
import {PhotosService} from '../../../../services/photos';
import {PhotosThumbnails} from '../photos-thumbnails/photos-thumbnails';
import {IPhoto} from '../../../../interfaces/photo';

enum Mode {
    EDIT,
    CREATE
}

// annotation section
@Component({
    selector: 'create-album',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [FORM_DIRECTIVES, PhotosThumbnails],
    templateUrl: 'components/admin/album/create-album/create-album.html'
})

// component controller
export class CreateAlbum {

    photos: Array<IPhoto>;
    albumForm: ControlGroup;
    mode: Mode = Mode.CREATE;

    constructor(
        params: RouteParams,
        private formBuilder: FormBuilder,
        private albumsService: AlbumsService,
        private photosService: PhotosService
    ) {

        let albumId = params.get('id');

        this.albumForm = formBuilder.group({
            name: [''],
            title: [''],
            description: [''],
            story: ['']
        });

        this.photosService.getPhotos(true, true)
            .subscribe(result => {
                this.photos = result;
            });

        if (albumId) {
            this.mode = Mode.EDIT;

            this.find(albumId);
        }
    }

    find(id: String) {
        this.albumsService.find(id)
            .subscribe(result => {

                this.albumForm.controls['description'].updateValue(result.description);
                this.albumForm.controls['name'].updateValue(result.name);
                this.albumForm.controls['story'].updateValue(result.story);
                this.albumForm.controls['title'].updateValue(result.title);

            });
    }

    create() {
        this.albumsService.create(this.albumForm.value)
            .subscribe(result => console.log(result));
    }
}
