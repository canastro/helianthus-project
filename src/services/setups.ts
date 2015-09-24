import {Component, View, Injectable, Inject, EventEmitter} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import {Setup} from '../interfaces/setup';
import * as Rx from 'rx';



@Injectable()
export class SetupsService {

	// setups: Array<any>;

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
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
