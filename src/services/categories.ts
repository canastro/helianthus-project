import {Component, View, Injectable, Inject, EventEmitter} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import {Category} from '../interfaces/category';
import * as Rx from 'rx';



@Injectable()
export class CategoriesService {

	// categories: Array<any>;

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
	) {
	}

	getAllCategories() : Rx.Observable<any> {
		var self = this;
		var path = '/api/categories';

		return this.http.get(path).toRx();
	}

	createCategory(category: Category) : Rx.Observable<any> {

		let path = '/api/admin/categories';
		let options = {
			headers: new Headers()
		};
		options.headers.append('x-access-token', this.authService.getToken());
		options.headers.append('Content-Type', 'application/json');

		return this.http.post(
			path,
			JSON.stringify(category),
			options
		)
            .toRx();
	}
}
