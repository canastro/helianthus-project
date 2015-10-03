import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import * as Rx from 'rx';

import {IContact} from '../interfaces/contact';
import {CONTACT} from '../config/env';

@Injectable()
export class ContactService {

    constructor(private http: Http) {
    }

    contact(contact: IContact) : Rx.Observable<any> {

        let options = {
            headers: new Headers()
        };

        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            CONTACT,
            JSON.stringify(contact),
            options
        )
        .toRx();
    }
}
