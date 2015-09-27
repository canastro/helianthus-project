import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import * as Rx from 'rx';

import {AuthService} from './auth';
import {ICategory} from '../interfaces/category';
import {CATEGORIES, ADMIN_CATEGORIES} from '../config/env';

@Injectable()
export class CategoriesService {

    // categories: Array<any>;

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    getAllCategories() : Rx.Observable<any> {

        return this.http.get(CATEGORIES).toRx();
    }

    createCategory(category: ICategory) : Rx.Observable<any> {

        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            ADMIN_CATEGORIES,
            JSON.stringify(category),
            options
        ).toRx();
    }

    delete(category: ICategory): Rx.Observable<any> {

        let url = `${ADMIN_CATEGORIES}/${category._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }
}
