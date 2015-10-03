
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Component,
    View
} from 'angular2/angular2';

import {ContactService} from '../../../services/contact';

// Annotation section
@Component({
    selector: 'contact',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'components/about/contact/contact.html'
})

export class Contact {

    contactForm: ControlGroup;

    constructor(
        private formBuilder: FormBuilder,
        private contactService: ContactService
    ) {

        this.contactForm = formBuilder.group({
            email: [''],
            message: ['']
        });
    }

    contact() {

        this.contactService.contact(this.contactForm.value)
            .subscribe(result => console.log(result));
    }
}
