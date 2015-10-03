import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {AuthService} from './auth';

import {IAlbum} from '../interfaces/album';
import {ALBUMS, ADMIN_ALBUMS} from '../config/env';

import * as Rx from 'rx';

@Injectable()
export class AlbumsService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    find(id: String) : Rx.Observable<any> {

        let url = `${ALBUMS}/${id}`;

        return this.http.get(url)
            .toRx()
            .selectMany(result => {
                let album = JSON.parse(result._body);
                return Promise.resolve(album);
            });
    }

    get() : Rx.Observable<any> {

        let options = {
            headers: new Headers()
        };

        options.headers.append('Content-Type', 'application/json');

        return this.http.get(ALBUMS, options)
            .toRx()
            .selectMany(result => {
                let albums = JSON.parse(result._body);
                return Promise.resolve(albums);
            });
    }

    create(album: IAlbum): Rx.Observable<any> {

        // let formData = new FormData();
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(
            ADMIN_ALBUMS,
            JSON.stringify(album),
            options
        )
        .toRx();
    }

    delete(album: IAlbum): Rx.Observable<any> {

        let url = `${ADMIN_ALBUMS}/${album._id}`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.delete(url, options).toRx();
    }

    toggleActivateState(album: IAlbum): Rx.Observable<any> {

        let url = `${ADMIN_ALBUMS}/${album._id}/toggleActivateState`;
        let options = {
            headers: new Headers()
        };
        options.headers.append('x-access-token', this.authService.getToken());
        options.headers.append('Content-Type', 'application/json');

        return this.http.put(url, null, options).toRx();
    }

}
