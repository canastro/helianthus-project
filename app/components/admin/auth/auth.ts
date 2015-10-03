
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Component,
    View
} from 'angular2/angular2';
import {AuthService} from '../../../services/auth';

// Annotation section
@Component({
    selector: 'auth',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'components/admin/auth/auth.html'
})

// Component controller
export class Auth {
    authForm: ControlGroup;

    // TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/login/login.ts
    // TODO; https://github.com/sitepoint-editors/PinYourAchievements-Angular2-TypeScript/blob/master/scripts/src/components/add/add.ts
    // TODO: https://groups.google.com/forum/#!topic/angular/diuTityfBOU
    // TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/app/LoggedInOutlet.ts
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
        this.authForm = formBuilder.group({
            password: [''],
            username: ['']
        });
    }

    authenticate() {
        this.authService.authenticate(this.authForm.value)
            .subscribe(result => {
                console.log(result);
            });
    }
}
