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

import {PhotosService} from '../../../services/photos';
import {CategoriesService} from '../../../services/categories';
import {TagsService} from '../../../services/tags';
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
  directives: [FORM_DIRECTIVES, Uploader, NgFor]
})

export class UploadPhoto {
    photoForm: any;
    allCategories: Array<any>;
    allTags: Array<any>;
    file: Object;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(PhotosService) private photosService: PhotosService,
        @Inject(CategoriesService) private categoriesService: CategoriesService,
        @Inject(TagsService) private tagsService: TagsService
    ) {
        this.photoForm = formBuilder.group({
            title: [''],
            description: [''],
            category: ['']
        });

        categoriesService.getAllCategories()
            .toRx()
            .subscribe(result => {
                this.allCategories = JSON.parse(result._body);
            });

        tagsService.getAllTags()
            .toRx()
            .subscribe(result => {
                this.allTags = JSON.parse(result._body);
            });
    }

    addTag(tag, value) {
        tag.selected = value === "on";
    }

    uploadPhoto() {

        var params = this.photoForm.value;
        params.file = this.file;

        params.tags = this.allTags
            .filter(tag => {
                return tag.selected;
            })
            .map(tag => {
                return tag._id
            });

        this.photosService.uploadPhoto(params)
            .subscribe(result => {
    			console.log(result);
    		});
    }

    onChange($event) {
        this.file = $event.target.files[0];
    }
}
