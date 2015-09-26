import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {IComment} from '../interfaces/comment';
import {IPhoto} from '../interfaces/photo';
import * as Rx from 'rx';

@Injectable()
export class CommentsService {

    constructor(
        private http: Http
    ) {
    }

    getCommentsByPhotoId(id: String) : Rx.Observable<any> {

        let path = '/api/photo/' + id + '/comment';

        return this.http.get(path)
            .toRx()
            .selectMany(result => {

                let comments = JSON.parse(result._body);
                return Promise.resolve(comments);
            });
    }

    commentPhoto(photo: IPhoto, params: IComment) : Rx.Observable<any> {

        let parameters;
        let path = '/api/photo/' + photo._id + '/comment';
        let options = {
            headers: new Headers()
        };

        options.headers.append('Content-Type', 'application/json');

        params.photo = photo;

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
