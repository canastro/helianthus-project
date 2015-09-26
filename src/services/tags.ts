import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';

import {ITag} from '../interfaces/tag';

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

    delete(tag: ITag): Rx.Observable<any> {

        let url = `/api/admin/tags/${tag._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }
}
