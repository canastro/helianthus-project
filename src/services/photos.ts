/// <reference path="../../typings/moment/moment.d.ts" />

import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';
import {IPhoto} from '../interfaces/photo';
import * as Rx from 'rx';

@Injectable()
export class PhotosService {

    photos: Array<IPhoto> = [];
    perPage: number = 20;
    page: number = 1;

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    find(id: String) : Rx.Observable<any> {

        let url = '/api/photo/' + id;

        if (this.photos && this.photos.length) {
            return Rx.Observable.create((observer) => {

                let photo;

                this.photos.some((item) => {

                    if (item._id === id) {
                        photo = item;
                        return true;
                    }

                    return false;
                });

                observer.onNext(photo);
                observer.onCompleted();
            });
        }

        return this.http.get(url)
            .toRx()
            .selectMany(result => {
                let photo = JSON.parse(result._body);
                photo.date = moment(photo.date).format('YYYY-MM-DD');
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

        let url;

        this.page = page || this.page + 1;

        url = `/api/photos?per_page=${this.perPage}&page=${this.page}`;

        return this.http.get(url)
            .toRx()
            .selectMany(result => {

                // this.photos = JSON.parse(result._body).photos.map((photo) => {
                //     photo.date = moment(photo.date).format('L');
                //     return photo;
                // });

                let tempPhotos = JSON.parse(result._body).photos;
                tempPhotos.forEach(photo => {
                    photo.date = moment(photo.date).format('L');
                });

                Array.prototype.push.apply(this.photos, tempPhotos);

                return Promise.resolve(this.photos);
            });
    }

    getPhotosCount(): Rx.Observable<any> {

        let url = '/api/photos/count';

        return this.http.get(url)
            .toRx()
            .selectMany(result => {
                return Promise.resolve(JSON.parse(result._body));
            });
    }

    // TODO: http://stackoverflow.com/questions/32423348/angular2-post-uploaded-file
    // TODO: https://github.com/angular/angular/issues/2803
    uploadPhoto(photo: IPhoto): Rx.Observable<any> {

        // let formData = new FormData();
        let url = '/api/admin/photos';
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
            url,
            JSON.stringify(photo),
            options
        )
        .toRx();
    }
}
