import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import * as Rx from 'rx';

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
}
