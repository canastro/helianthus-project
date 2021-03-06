
import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import * as Rx from 'rx';

import {AuthService} from './auth';
import {IPhoto} from '../interfaces/photo';
import {PHOTOS, ADMIN_PHOTOS} from '../config/env';

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

        let url = `${PHOTOS}/${id}`;

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

    getPhotos(force: boolean = false, showHidden: boolean = false) : Rx.Observable<any> {

        if (!force && this.photos && this.photos.length > 0) {
            return Rx.Observable.create((observer) => {

                let results = this.photos;

                if (!showHidden) {
                    results = this.photos.filter(item => {
                        return item.isActive;
                    });
                }

                observer.onNext(results);
                observer.onCompleted();
            });
        }

        this.photos = [];

        return this.loadMore(1, showHidden);
    }

    loadMore(page: number, showHidden: boolean = false): Rx.Observable<any> {

        let url;

        this.page = page || this.page + 1;

        url = `${PHOTOS}?per_page=${this.perPage}&page=${this.page}&show_hidden=${showHidden}`;

        return this.http.get(url)
            .toRx()
            .selectMany(result => {

                let tempPhotos = JSON.parse(result._body).photos;
                tempPhotos.forEach(photo => {
                    photo.date = moment(photo.date).format('L');
                });

                Array.prototype.push.apply(this.photos, tempPhotos);

                return Promise.resolve(this.photos);
            });
    }

    delete(photo: IPhoto): Rx.Observable<any> {

        let url = `${ADMIN_PHOTOS}/${photo._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }

    getPhotosCount(): Rx.Observable<any> {

        let url = `${PHOTOS}/count`;

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
            ADMIN_PHOTOS,
            JSON.stringify(photo),
            options
        )
        .toRx();
    }

    toggleActivateState(photo: IPhoto): Rx.Observable<any> {

        let url = `${ADMIN_PHOTOS}/${photo._id}/toggleActivateState`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.put(url, null, options).toRx();
    }
}
