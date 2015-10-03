
import {Component, View} from 'angular2/angular2';
import {Contact} from '../contact/contact';
import {Description} from '../description/description';

// Annotation section
@Component({
    selector: 'about'
})

@View({
    templateUrl: 'components/about/index/index.html',
    directives: [Contact, Description]
})

// Component controller
export class About {

}
