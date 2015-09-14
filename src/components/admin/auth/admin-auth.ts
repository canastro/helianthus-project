/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {FORM_DIRECTIVES, FormBuilder, Component, View, Validators, ControlGroup, Inject} from 'angular2/angular2';
import {AuthService} from '../../../services/auth';

// Annotation section
@Component({
    selector: 'admin-auth',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/admin/auth/admin-auth.html',
  directives: [FORM_DIRECTIVES]
})

// Component controller
export class AdminAuth {
    authForm: any;

    //TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/login/login.ts
    //TODO; https://github.com/sitepoint-editors/PinYourAchievements-Angular2-TypeScript/blob/master/scripts/src/components/add/add.ts
    //TODO: https://groups.google.com/forum/#!topic/angular/diuTityfBOU
    constructor(
        private formBuilder: FormBuilder,
        @Inject(AuthService) private authService: AuthService
    ) {
        this.authForm = formBuilder.group({
            username: [''],
            password: ['']
        });
    }

    authenticate() {
        this.authService.authenticate(this.authForm.value)
    		.subscribe(result => {
    			console.log(result);
    		});
    }
}
