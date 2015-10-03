
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Component,
    View
} from 'angular2/angular2';
import {TagsService} from '../../../services/tags';

// annotation section
@Component({
    selector: 'create-task',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/admin/create-tag/create-tag.html',
  directives: [FORM_DIRECTIVES]
})

// component controller
export class CreateTag {
    taskForm: ControlGroup;

    // TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/login/login.ts
    // TODO; https://github.com/sitepoint-editors/PinYourAchievements-Angular2-TypeScript/blob/master/scripts/src/components/add/add.ts
    // TODO: https://groups.google.com/forum/#!topic/angular/diuTityfBOU
    // TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/app/LoggedInOutlet.ts
    constructor(
        private formBuilder: FormBuilder,
        private tagsService: TagsService
    ) {
        this.taskForm = formBuilder.group({
            name: ['']
        });
    }

    createTag() {
        this.tagsService.createTag(this.taskForm.value)
            .subscribe(result => {
                console.log(result);
            });
    }
}
