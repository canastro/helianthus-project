
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Component,
    View
} from 'angular2/angular2';
import {AlbumsService} from '../../../services/albums';

// annotation section
@Component({
    selector: 'create-album',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'components/admin/create-album/create-album.html'
})

// component controller
export class CreateAlbum {
    albumForm: ControlGroup;

    constructor(
        private formBuilder: FormBuilder,
        private albumsService: AlbumsService
    ) {
        this.albumForm = formBuilder.group({
            name: [''],
            title: [''],
            description: [''],
            story: ['']
        });
    }

    create() {
        this.albumsService.create(this.albumForm.value)
            .subscribe(result => console.log(result));
    }
}
