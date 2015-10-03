
import {Component, View, Inject} from 'angular2/angular2';
import {CategoriesService} from '../../../services/categories';

import {Settings} from '../settings/settings';
import {Gallery} from '../gallery/gallery';

// Annotation section
@Component({
  selector: 'home'
})

@View({
  templateUrl: 'components/home/index/index.html',
  directives: [Gallery, Settings]
})

// Component controller
export class Home {

    constructor(private categoriesService: CategoriesService) {
    }

    getAllCategories() {
        this.categoriesService.getAllCategories();
    }
}
