import {Component, Injectable, Inject} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Injectable()
export class AuthService {


	constructor(private http: Http) {
	}

	authenticate(params) : any {

		var path = '/api/admin/authenticate';

		return this.http.post(path, params)
            .toRx()
    		.subscribe(result => {
    			var token = JSON.parse(result._body);
				localStorage.setItem('jwt', token);
                return true;
    		});
	}
}
