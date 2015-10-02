/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View} from 'angular2/angular2';
import {Contact} from '../contact/contact';

// Annotation section
@Component({
    selector: 'about'
})

@View({
    templateUrl: 'components/about/about.html',
    directives: [Contact]
})

// Component controller
export class About {

}
