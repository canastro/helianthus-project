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

import {SetupsService} from '../../../services/setups';

import {RouteParams} from 'angular2/router';

// annotation section
@Component({
    selector: 'create-setup',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [FORM_DIRECTIVES, NgFor, NgIf],
    templateUrl: 'components/admin/create-setup/create-setup.html'
})

export class CreateSetup {

    setupForm: ControlGroup;

    constructor(
        private formBuilder: FormBuilder,
        params: RouteParams,
        private setupsService: SetupsService
    ) {

        this.setupForm = formBuilder.group({
            machine: ['', Validators.required],
            focal_length: ['', Validators.required],
            aperture: ['', Validators.required],
            exposure_time: ['', Validators.required],
            flash: [true, Validators.required],
            iso: ['', Validators.required]
        });

    }

    create() {
        this.setupsService.create(this.setupForm.value)
            .subscribe(result => {
                console.log(result);
            });
    }
}
