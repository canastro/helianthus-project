import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import * as Rx from 'rx';

@Injectable()
export class PhotosService {

	photos: any;

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
	) {
	}

	find(id) {

		var path = '/api/photo/' + id;

		if (this.photos) {
			var xs = Rx.Observable.create((observer) => {
				observer.onNext(this.photos.find(photo => photo._id === id));
				observer.onCompleted();
			});
		}

		return this.http.get(path)
			.toRx()
			.selectMany(result => {
				var photo = JSON.parse(result._body);
				return Promise.resolve(photo);
			});
	}

	getPhotos() : any {

		var path = '/api/photos';

		return this.http.get(path)
			.toRx()
			.selectMany(result => {
				this.photos = JSON.parse(result._body);
				return Promise.resolve(this.photos);
			});
	}

	//TODO: http://stackoverflow.com/questions/32423348/angular2-post-uploaded-file
	//https://github.com/angular/angular/issues/2803
	uploadPhoto(params) : any {

		// let formData = new FormData();
		let path = '/api/admin/photos';
		let options = {
			headers: new Headers()
		};
		options.headers.append('x-access-token', this.authService.getToken());
		options.headers.append('Content-Type', 'application/json');

		// options.headers.append('x-access-token', this.authService.getToken());
		// options.headers.append('Content-Type', 'multipart/form-data');
		//
		// Object.keys(params).forEach(key => {
		//
		// 	if (key === 'file') {
		// 		formData.append(key, params[key], key + '.png');
		// 	}
		//     formData.append(key, params[key]);
		// });

		return this.http.post(
			path,
			JSON.stringify(params),
			options
		)
            .toRx();
	}
}
