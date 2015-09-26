/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Component,
    View,
    NgFor
} from 'angular2/angular2';

import {ISetup} from '../../../interfaces/setup';
import {ICategory} from '../../../interfaces/category';
import {ITag} from '../../../interfaces/tag';

import {PhotosService} from '../../../services/photos';
import {CategoriesService} from '../../../services/categories';
import {TagsService} from '../../../services/tags';
import {SetupsService} from '../../../services/setups';

import {Dropdown} from '../../dropdown/dropdown';

// annotation section
@Component({
    selector: 'upload-photo',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [Dropdown, FORM_DIRECTIVES, NgFor],
    templateUrl: 'components/admin/upload-photo/upload-photo.html'
})

export class UploadPhoto {

    photoForm: ControlGroup;
    setups: Array<ISetup>;
    allCategories: Array<ICategory>;
    allTags: Array<ITag>;

    setupDropdownKeys: Array<Object> = [{
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
    setup: ISetup;

    constructor(
        private formBuilder: FormBuilder,
        private photosService: PhotosService,
        private categoriesService: CategoriesService,
        private tagsService: TagsService,
        private setupsService: SetupsService
    ) {
        this.photoForm = formBuilder.group({
            category: [''],
            date: [''],
            description: [''],
            name: [''],
            story: [''],
            title: ['']
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
        tag.isSelected = value === 'on';
    }

    uploadPhoto() {

        let params = this.photoForm.value;

        params.file = this.file;

        params.tags = this.allTags
            .filter(tag => {
                return tag.isSelected;
            })
            .map(tag => {
                return tag._id;
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
