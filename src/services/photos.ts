import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import {Photo} from '../interfaces/photo';
import * as Rx from 'rx';

@Injectable()
export class PhotosService {

	photos: Array<Photo> = [];
	perPage: number = 20;
    page: number = 1;

	constructor(
		private http: Http,
		@Inject(AuthService) private authService: AuthService
	) {
	}

	find(id: number) : Rx.Observable<any> {

		var path = '/api/photo/' + id;

		if (this.photos) {
			return Rx.Observable.create((observer) => {

				var photo = this.photos.some(photo => photo._id === id);

				observer.onNext(photo);
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

	getPhotos() : Rx.Observable<any> {

		if (this.photos && this.photos.length > 0) {
			return Rx.Observable.create((observer) => {
				observer.onNext(this.photos);
				observer.onCompleted();
			});
		}

		return this.loadMore(1);
	}

	loadMore(page: number): Rx.Observable<any> {

		var path;

		this.page = page || this.page + 1;

		path = `/api/photos?per_page=${this.perPage}&page=${this.page}`;

		return this.http.get(path)
			.toRx()
			.selectMany(result => {
				Array.prototype.push.apply(this.photos, JSON.parse(result._body).photos);

				return Promise.resolve(this.photos);
			});
	}

	getPhotosCount(): Rx.Observable<any> {
		var path = "/api/photos/count";

		return this.http.get(path)
			.toRx()
			.selectMany(result => {
				return Promise.resolve(JSON.parse(result._body));
			});
	}

	//TODO: http://stackoverflow.com/questions/32423348/angular2-post-uploaded-file
	//https://github.com/angular/angular/issues/2803
	uploadPhoto(photo: Photo): Rx.Observable<any> {

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
			JSON.stringify(photo),
			options
		)
            .toRx();
	}
}
