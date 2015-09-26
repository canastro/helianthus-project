/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {
    FormBuilder,
    Component,
    View,
    NgFor
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

import {ICategory} from '../../../interfaces/category';
import {CategoriesService} from '../../../services/categories';

// annotation section
@Component({
    selector: 'list-categories',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [ROUTER_DIRECTIVES, RouterLink, NgFor],
    templateUrl: 'components/admin/list-categories/list-categories.html'
})

export class ListCategories {

    categories: Array<ICategory>;

    constructor(
        private categoriesService: CategoriesService,
        private router: Router
    ) {

        this.get();
    }

    get() {
        this.categoriesService.getAllCategories()
            .subscribe(result => {
                this.categories = JSON.parse(result._body);
            });
    }

    delete(category: ICategory) {
        this.categoriesService.delete(category)
            .subscribe(() => {
                this.get();
            });
    }
}
