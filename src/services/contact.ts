import {Component, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import * as Rx from 'rx';

@Injectable()
export class ContactService {


	constructor(private http: Http) {
	}

	contact(params) : any {
		let path = '/api/contact';
		let options = {
			headers: new Headers()
		};
		options.headers.append('Content-Type', 'application/json');

		return this.http.post(
			path,
			JSON.stringify(params),
			options
		)
            .toRx();
	}
}
