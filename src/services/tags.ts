import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';

@Injectable()
export class TagsService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    getAllTags() : Rx.Observable<any> {

        let url = '/api/tags';

        return this.http.get(url).toRx();
    }

    createTag(params) : Rx.Observable<any> {

        let url = '/api/admin/tags';
        let options = {
            headers: new Headers()
        };

        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            url,
            JSON.stringify(params),
            options
        ).toRx();
    }
}
