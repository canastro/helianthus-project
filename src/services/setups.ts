import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import * as Rx from 'rx';

import {ISetup} from '../interfaces/setup';

@Injectable()
export class SetupsService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    getAllSetups() : Rx.Observable<any> {

        let path = '/api/admin/setups';
        let options = {
            headers: new Headers()
        };

        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.get(path, options).toRx();
    }

    delete(setup: ISetup): Rx.Observable<any> {

        let url = `/api/admin/setups/${setup._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }
}
