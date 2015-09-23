import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';

@Injectable()
export class TagsService {

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
	) {
	}

	getAllTags() : Rx.Observable<any> {
		var self = this;
		var path = '/api/tags';

		return this.http.get(path).toRx();
	}

	createTag(params) : Rx.Observable<any> {

		let path = '/api/admin/tags';
		let options = {
			headers: new Headers()
		};
		options.headers.append('x-access-token', this.authService.getToken());
		options.headers.append('Content-Type', 'application/json');

		return this.http.post(
			path,
			JSON.stringify(params),
			options
		)
            .toRx();
	}
}
