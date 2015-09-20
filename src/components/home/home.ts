/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject} from 'angular2/angular2';
import {CategoriesService} from '../../services/categories';

import {Settings} from '../settings/settings';
import {Gallery} from '../gallery/gallery';

// Annotation section
@Component({
  selector: 'home'
})

@View({
  templateUrl: 'components/home/home.html',
  directives: [Gallery, Settings]
})

// Component controller
export class Home {

    constructor(@Inject(CategoriesService) private categoriesService: CategoriesService) {
    }

    getAllCategories() {
        this.categoriesService.getAllCategories();
    }
}
