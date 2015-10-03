
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Component,
    View
} from 'angular2/angular2';
import {CategoriesService} from '../../../../services/categories';

// annotation section
@Component({
    selector: 'create-category',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'components/admin/category/create-category/create-category.html'
})

// component controller
export class CreateCategory {
    categoryForm: ControlGroup;

    // TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/login/login.ts
    // TODO; https://github.com/sitepoint-editors/PinYourAchievements-Angular2-TypeScript/blob/master/scripts/src/components/add/add.ts
    // TODO: https://groups.google.com/forum/#!topic/angular/diuTityfBOU
    // TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/app/LoggedInOutlet.ts
    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService
    ) {
        this.categoryForm = formBuilder.group({
            name: ['']
        });
    }

    createCategory() {
        this.categoriesService.createCategory(this.categoryForm.value)
            .subscribe(result => console.log(result));
    }
}
