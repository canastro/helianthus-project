import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import {ICategory} from '../interfaces/category';
import * as Rx from 'rx';

@Injectable()
export class CategoriesService {

    // categories: Array<any>;

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    getAllCategories() : Rx.Observable<any> {

        let url = '/api/categories';
        return this.http.get(url).toRx();
    }

    createCategory(category: ICategory) : Rx.Observable<any> {

        let url = '/api/admin/categories';
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            url,
            JSON.stringify(category),
            options
        ).toRx();
    }

    delete(category: ICategory): Rx.Observable<any> {

        let url = `/api/admin/categories/${category._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }
}
