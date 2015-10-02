import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';

import {ALBUMS} from '../config/env';

import * as Rx from 'rx';

@Injectable()
export class AlbumsService {

    constructor(private http: Http) {
    }

    get() : Rx.Observable<any> {

        let options = {
            headers: new Headers()
        };

        options.headers.append('Content-Type', 'application/json');

        return this.http.get(ALBUMS, options)
            .toRx()
            .selectMany(result => {
                let albums = JSON.parse(result._body);
                return Promise.resolve(albums);
            });
    }

}
