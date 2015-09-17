/// <reference path="../../../typings/angular2/angular2.d.ts" />
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

import {ContactService} from '../../services/contact';

// Annotation section
@Component({
    selector: 'contact',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/contact/contact.html',
  directives: [FORM_DIRECTIVES]
})

export class Contact {
    contactForm: any;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(ContactService) private contactService: ContactService
    ) {
        this.contactForm = formBuilder.group({
            email: [''],
            message: ['']
        });
    }

    contact() {

        this.contactService.contact(this.contactForm.value)
            .subscribe(result => {
    			console.log(result);
    		});
    }
}
