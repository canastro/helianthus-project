/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {FORM_DIRECTIVES, FormBuilder, Component, View, Validators, ControlGroup, Inject} from 'angular2/angular2';
import {PhotosService} from '../../../services/photos';
import {Uploader} from '../../../directives/uploader';

// Annotation section
@Component({
    selector: 'upload-photo',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/admin/upload-photo/upload-photo.html',
  directives: [FORM_DIRECTIVES, Uploader]
})

export class UploadPhoto {
    photoForm: any;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(PhotosService) private photosService: PhotosService
    ) {
        this.photoForm = formBuilder.group({
            title: [''],
            description: [''],
            photo: ['']
        });
    }

    uploadPhoto() {

        debugger;

        this.photosService.uploadPhoto(this.photoForm.value)
            .subscribe(result => {
    			console.log(result);
    		});
    }

    changed($event) {
        debugger;
        console.log($event);
    }
}
