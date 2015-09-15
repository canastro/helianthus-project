/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {FORM_DIRECTIVES, FormBuilder, Component, View, Validators, ControlGroup, Inject} from 'angular2/angular2';
import {CategoriesService} from '../../../services/categories';

// Annotation section
@Component({
    selector: 'create-category',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/admin/create-category/create-category.html',
  directives: [FORM_DIRECTIVES]
})

// Component controller
export class CreateCategory {
    categoryForm: any;

    //TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/login/login.ts
    //TODO; https://github.com/sitepoint-editors/PinYourAchievements-Angular2-TypeScript/blob/master/scripts/src/components/add/add.ts
    //TODO: https://groups.google.com/forum/#!topic/angular/diuTityfBOU
    //TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/app/LoggedInOutlet.ts
    constructor(
        private formBuilder: FormBuilder,
        @Inject(CategoriesService) private categoriesService: CategoriesService
    ) {
        this.categoryForm = formBuilder.group({
            name: ['']
        });
    }

    createCategory() {
        this.categoriesService.createCategory(this.categoryForm.value)
            .subscribe(result => {
    			console.log(result);
    		});
    }
}
