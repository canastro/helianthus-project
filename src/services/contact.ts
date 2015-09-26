import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {IContact} from '../interfaces/contact';
import * as Rx from 'rx';

@Injectable()
export class ContactService {

    constructor(private http: Http) {
    }

    contact(contact: IContact) : Rx.Observable<any> {

        let path = '/api/contact';
        let options = {
            headers: new Headers()
        };

        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            path,
            JSON.stringify(contact),
            options
        )
        .toRx();
    }
}
