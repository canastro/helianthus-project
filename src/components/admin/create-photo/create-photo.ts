/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {
    FORM_DIRECTIVES,
    FormBuilder,
    Validators,
    ControlGroup,
    Component,
    View,
    NgFor,
    NgIf
} from 'angular2/angular2';

import {ISetup} from '../../../interfaces/setup';
import {ICategory} from '../../../interfaces/category';
import {ITag} from '../../../interfaces/tag';
import {IPhoto} from '../../../interfaces/photo';
import {IComment} from '../../../interfaces/comment';

import {PhotosService} from '../../../services/photos';
import {CategoriesService} from '../../../services/categories';
import {TagsService} from '../../../services/tags';
import {SetupsService} from '../../../services/setups';
import {CommentsService} from '../../../services/comments';

import {Dropdown} from '../../dropdown/dropdown';

import {RouteParams} from 'angular2/router';

enum Mode {
    EDIT,
    CREATE
}

// annotation section
@Component({
    selector: 'upload-photo',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [Dropdown, FORM_DIRECTIVES, NgFor, NgIf],
    templateUrl: 'components/admin/create-photo/create-photo.html'
})

export class CreatePhoto {

    mode: Mode = Mode.CREATE;
    photo: IPhoto;
    photoForm: ControlGroup;
    setups: Array<ISetup>;
    categories: Array<ICategory>;
    tags: Array<ITag>;
    comments: Array<IComment>;

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
        params: RouteParams,
        private photosService: PhotosService,
        private commentsService: CommentsService,
        private categoriesService: CategoriesService,
        private tagsService: TagsService,
        private setupsService: SetupsService
    ) {
        let photoId = params.get('id');

        // @TODO: how to store setup here (custom dropdown)
        // @TODO: how to store tags here (checkbox group)
        this.photoForm = formBuilder.group({
            category: ['', Validators.required],
            date: ['', Validators.required],
            description: ['', Validators.required],
            name: ['', Validators.required],
            story: [''],
            title: ['', Validators.required]
        });

        if (photoId) {
            this.mode = Mode.EDIT;

            this.loadPhoto(photoId);
        }

        this.loadDataSources();
    }

    loadPhoto(id: String) {
        this.photosService.find(id)
            .subscribe(result => {
                this.photo = result;

                this.photoForm.controls['category'].updateValue(this.photo.category._id);
                this.photoForm.controls['date'].updateValue(this.photo.date);
                this.photoForm.controls['description'].updateValue(this.photo.description);
                this.photoForm.controls['name'].updateValue(this.photo.name);
                this.photoForm.controls['story'].updateValue(this.photo.story);
                this.photoForm.controls['title'].updateValue(this.photo.title);

            });

        this.commentsService.getCommentsByPhotoId(id)
            .subscribe(result => this.comments = result);
    }

    loadDataSources() {
        this.categoriesService.getAllCategories()
            .subscribe(result => {
                this.categories = JSON.parse(result._body);
            });

        this.setupsService.getAllSetups()
            .subscribe(result => {

                this.setups = JSON.parse(result._body);

                this.setups.forEach(function (item, index) {
                    item.index = index + 1;
                });
            });

        this.tagsService.getAllTags()
            .subscribe(result => {
                this.tags = JSON.parse(result._body);
            });
    }

    addTag(tag, value) {
        tag.isSelected = value === 'on';
    }

    uploadPhoto() {

        let params = this.photoForm.value;

        params.file = this.file;

        params.tags = this.tags
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
