import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import * as Rx from 'rx';

import {IComment} from '../interfaces/comment';
import {IPhoto} from '../interfaces/photo';
import {PHOTOS} from '../config/env';

@Injectable()
export class CommentsService {

    constructor(
        private http: Http
    ) {
    }

    getCommentsByPhotoId(id: String) : Rx.Observable<any> {

        let path = `${PHOTOS}/${id}/comment`;

        return this.http.get(path)
            .toRx()
            .selectMany(result => {

                let comments = JSON.parse(result._body);
                return Promise.resolve(comments);
            });
    }

    commentPhoto(photo: IPhoto, parameters: IComment) : Rx.Observable<any> {

        let path = `${PHOTOS}/${photo._id}/comment`;
        let options = {
            headers: new Headers()
        };

        options.headers.append('Content-Type', 'application/json');

        parameters.photo = photo;

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
