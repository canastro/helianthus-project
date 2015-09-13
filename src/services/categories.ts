import {Component, View, Injectable, Inject} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Injectable()
export class CategoriesService {
	constructor(@Inject(Http) private http: Http) {
	}

	getAchievementsOfType(type: string) : any {
		var path = '/api/achievements/' + type;
		return this.http.get(path);
	}

	getAllCategories() : any {
		var path = '/api/achievements';
		return this.http.get(path);
	}

	addAnAchievement(newAchievement) {
		var path = '/api/achievements';
		return this.http.post(path, JSON.stringify(newAchievement));
	}
}
