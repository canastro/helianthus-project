/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {
    Component,
    View,
    Inject,
    EventEmitter,
    NgFor
} from 'angular2/angular2';

// Annotation section
@Component({
    selector: 'dropdown',
    properties: ['hpTitle: hpTitle', 'hpOptions: hpOptions', 'hpKeys: hpKeys'],
    events: ['hpOptionSelected']
})

@View({
  templateUrl: 'components/dropdown/dropdown.html',
  directives: [NgFor]
})

export class Dropdown {

    title: String;
    originalTitle: String;

    hpKeys: Array<any>;
    hpOptions: Array<any>;
    hpOptionSelected = new EventEmitter();

    constructor() {

    }

    set hpTitle(value) {
        this.title = value;
        this.originalTitle = value;
    }

    onClick(option) {

        this.hpOptions.forEach(option => {
            option.selected = false;
        });

        option.selected = true;

        this.title = option.index;

        this.hpOptionSelected.next(option);
    }
}
