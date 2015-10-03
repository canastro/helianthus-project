import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import * as Rx from 'rx';

import {AuthService} from './auth';
import {ISetup} from '../interfaces/setup';
import {ADMIN_SETUPS} from '../config/env';

@Injectable()
export class SetupsService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    getAllSetups() : Rx.Observable<any> {

        let options = {
            headers: new Headers()
        };

        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.get(ADMIN_SETUPS, options).toRx();
    }

    create(setup: ISetup) : Rx.Observable<any> {

        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            ADMIN_SETUPS,
            JSON.stringify(setup),
            options
        ).toRx();
    }

    delete(setup: ISetup): Rx.Observable<any> {

        let url = `${ADMIN_SETUPS}/${setup._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }
}
