import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import * as Rx from 'rx';

@Injectable()
export class PhotosService {

	photos: any = [];
	perPage: number = 20;
    page: number = 1;

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
	) {
	}

	find(id) {

		var path = '/api/photo/' + id;

		if (this.photos) {
			return Rx.Observable.create((observer) => {
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

		if (this.photos && this.photos.length > 0) {
			return Rx.Observable.create((observer) => {
				observer.onNext(this.photos);
				observer.onCompleted();
			});
		}

		return this.loadMore(1);
	}

	loadMore(page) : any {

		var perPage = this.perPage;
		var page = page || this.page + 1;
		var path = `/api/photos?per_page=${perPage}&page=${page}`;

		return this.http.get(path)
			.toRx()
			.selectMany(result => {
				Array.prototype.push.apply(this.photos, JSON.parse(result._body).photos);

				return Promise.resolve(this.photos);
			});
	}

	getPhotosCount(): any {
		var path = "/api/photos/count";

		return this.http.get(path)
			.toRx()
			.selectMany(result => {
				return Promise.resolve(JSON.parse(result._body));
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
