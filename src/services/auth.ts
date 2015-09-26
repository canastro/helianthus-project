import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {IAuthenticate} from '../interfaces/authenticate';
import * as Rx from 'rx';


@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    authenticate(params: IAuthenticate) : Rx.Observable<any> {

        let path = '/api/admin/authenticate';
        let options = {
            headers: new Headers()
        };

        options.headers.append('Content-Type', 'application/json');

        return this.http.post(path, JSON.stringify(params), options)
            .toRx()
            .selectMany(result => {
                let response = JSON.parse(result._body);

                if (!response.success) {
                    return Promise.reject({
                        error: 'Failed to authenticate'
                    });
                }

                localStorage.setItem('jwt', response.token);

                return Promise.resolve();
            });
    }

    isLogged() : boolean {
        return !!localStorage.getItem('jwt');
    }

    getToken() : string {
        return localStorage.getItem('jwt');
    }
}
