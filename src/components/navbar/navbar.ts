/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject} from 'angular2/angular2';
import {CategoriesService} from '../../services/categories';

// Annotation section
@Component({
  selector: 'navbar'
})

@View({
  templateUrl: 'components/navbar/navbar.html'
})

// Component controller
export class NavBar {

    constructor(@Inject(CategoriesService) private categoriesService: CategoriesService) {
    }

    getAllCategories() {
        this.categoriesService.getAllCategories();
    }
}
