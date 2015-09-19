import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import * as Rx from 'rx';

@Injectable()
export class CommentsService {

	constructor(
		private http: Http
	) {
	}

	getCommentsByPhotoId(id) {

		var path = '/api/photo/' + id + '/comment';

		return this.http.get(path)
			.toRx()
			.selectMany(result => {
				var comments = JSON.parse(result._body);
				return Promise.resolve(comments);
			});
	}

	commentPhoto(photo, params) : any {

        let parameters;
		let path = '/api/photo/' + photo._id + '/comment';
        let options = {
			headers: new Headers()
		};
		options.headers.append('Content-Type', 'application/json');

        parameters = {
            positionX: params.position.left,
            positionY: params.position.top,
            message: params.message,
            photo: photo
        };

        return this.http.post(
            path,
            JSON.stringify(parameters),
            options
        )
			.toRx()
			.selectMany(result => {
				let response = JSON.parse(result._body);
				return Promise.resolve(response);
			});
	}
}
