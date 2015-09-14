import {Component, Injectable, Inject} from 'angular2/angular2';
import {Http} from 'angular2/http';
import * as Rx from 'rx';

@Injectable()
export class AuthService {


	constructor(private http: Http) {
	}

	authenticate(params): any {

		var path = '/api/admin/authenticate';

		return this.http.post(path, params)
            .toRx()
			.flatMap(result => {
				var token = JSON.parse(result._body);
				localStorage.setItem('jwt', token)
				return Promise.resolve();
			});
	}
}
