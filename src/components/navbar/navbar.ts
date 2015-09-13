/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor} from 'angular2/angular2';
import {CategoriesService} from '../../services/categories';

// Annotation section
@Component({
  selector: 'navbar'
})

@View({
  templateUrl: 'components/navbar/navbar.html',
  directives: [NgFor]
})

// Component controller
export class NavBar {

    categories: Array<any>;

    constructor(private categoriesService: CategoriesService) {

        var self = this;

        categoriesService.getAllCategories()
        .toRx()
        .subscribe(result => {
            self.categories = JSON.parse(result._body);
        });

    }

    getAllCategories() {
        this.categoriesService.getAllCategories();
    }
}
