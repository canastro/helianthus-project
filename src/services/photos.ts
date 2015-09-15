import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';

@Injectable()
export class PhotosService {

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
	) {
	}

	getAllPhotos() : any {
		var self = this;
		var path = '/api/photos';

		return this.http.get(path);
	}

	uploadPhoto(params) : any {

		let path = '/api/admin/photos';
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
