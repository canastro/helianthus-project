import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';

import {AuthService} from './auth';
import {TAGS, ADMIN_TAGS} from '../config/env';
import {ITag} from '../interfaces/tag';

@Injectable()
export class TagsService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    getAllTags() : Rx.Observable<any> {

        return this.http.get(TAGS).toRx();
    }

    createTag(params) : Rx.Observable<any> {

        let options = {
            headers: new Headers()
        };

        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            ADMIN_TAGS,
            JSON.stringify(params),
            options
        ).toRx();
    }

    delete(tag: ITag): Rx.Observable<any> {

        let url = `${ADMIN_TAGS}/${tag._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }
}
