import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';

@Injectable()
export class TasksService {

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
	) {
	}

	getAllTasks() : any {
		var self = this;
		var path = '/api/tasks';

		return this.http.get(path);
	}

	createTask(params) : any {

		let path = '/api/admin/tasks';
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
