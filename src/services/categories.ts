import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Injectable()
export class CategoriesService {

	// categories: Array<any>;

	constructor(private http: Http) {

		//this.getAllCategories();
	}

	getAchievementsOfType(type: string) : any {
		var path = '/api/achievements/' + type;
		return this.http.get(path);
	}

	//TODO: get a way of storing this and return as promises... this.http.get doesnt return promises??
	getAllCategories() : any {
		var self = this;
		var path = '/api/categories';

		return this.http.get(path)
		// .toRx()
		// .subscribe(result => {
		// 	self.categories = JSON.parse(result._body);
		// });
	}

	addAnAchievement(newAchievement) {
		var path = '/api/achievements';
		return this.http.post(path, JSON.stringify(newAchievement));
	}
}
