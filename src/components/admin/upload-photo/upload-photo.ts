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

import {Setup} from '../../../interfaces/setup';

import {PhotosService} from '../../../services/photos';
import {CategoriesService} from '../../../services/categories';
import {TagsService} from '../../../services/tags';
import {SetupsService} from '../../../services/setups';

import {Dropdown} from '../../dropdown/dropdown';

// Annotation section
@Component({
    selector: 'upload-photo',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/admin/upload-photo/upload-photo.html',
  directives: [FORM_DIRECTIVES, NgFor, Dropdown]
})

export class UploadPhoto {
    photoForm: any;
    setups: Array<any>;
    allCategories: Array<any>;
    allTags: Array<any>;
    setupDropdownKeys: Array<any> = [{
        description: 'Machine',
        key: 'machine'
    }, {
        description: 'Focal Length',
        key: 'focal_length'
    }, {
        description: 'Aperture',
        key: 'aperture'
    }, {
        description: 'Exposure Time',
        key: 'exposure_time'
    }, {
        description: 'Flash',
        key: 'flash'
    }, {
        description: 'Iso',
        key: 'iso'
    }];

    file: Object;
    setup: Setup;

    constructor(
        private formBuilder: FormBuilder,
        private photosService: PhotosService,
        private categoriesService: CategoriesService,
        private tagsService: TagsService,
        private setupsService: SetupsService
    ) {
        this.photoForm = formBuilder.group({
            name: [''],
            title: [''],
            date: [''],
            description: [''],
            category: [''],
            story: [''],
        });

        categoriesService.getAllCategories()
            .subscribe(result => {
                this.allCategories = JSON.parse(result._body);
            });

        setupsService.getAllSetups()
            .subscribe(result => {

                this.setups = JSON.parse(result._body);

                this.setups.forEach(function (item, index) {
                    item.index = index + 1;
                });
            });

        tagsService.getAllTags()
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

        params.setup = this.setup;

        this.photosService.uploadPhoto(params)
            .subscribe(result => {
    			console.log(result);
    		});
    }

    setupSelected(setup) {
        this.setup = setup;
    }

    onChange($event) {
        this.file = $event.target.files[0];
    }
}
