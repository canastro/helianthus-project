/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {
    Component,
    View,
    EventEmitter,
    NgFor
} from 'angular2/angular2';

interface IHpKeys {
    description: String;
    key: String;
}

interface IHpOtions {
    isSelected: boolean;
}

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

    hpKeys: Array<IHpKeys>;
    hpOptions: Array<IHpOtions>;
    hpOptionSelected = new EventEmitter();

    set hpTitle(value) {
        this.title = value;
        this.originalTitle = value;
    }

    onClick(option) {

        this.hpOptions.forEach(opt => {
            opt.isSelected = false;
        });

        option.isSelected = true;

        this.title = option.index;

        this.hpOptionSelected.next(option);
    }
}
