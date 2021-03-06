
import {Directive} from 'angular2/angular2';

// TODO: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Directive({
    selector: 'input[uploader]',
    host: {
        '[value]' : 'value',
        '(change)': 'onChange($event)'
    }
})

export class Uploader {

    value: String;
    file: Object;

    onChange($event) {

        if (!$event.target.files || !$event.target.files.length || !$event.target.files[0]) {
            return true;
        }

        this.file = $event.target.files[0];
    }
}
