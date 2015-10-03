

import {
    FormBuilder,
    Component,
    View,
    NgFor
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

import {ITag} from '../../../interfaces/tag';
import {TagsService} from '../../../services/tags';

// annotation section
@Component({
    selector: 'list-tags',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [ROUTER_DIRECTIVES, RouterLink, NgFor],
    templateUrl: 'components/admin/list-tags/list-tags.html'
})

export class ListTags {

    tags: Array<ITag>;

    constructor(
        private tagsService: TagsService,
        private router: Router
    ) {

        this.get();
    }

    get() {
        this.tagsService.getAllTags()
            .subscribe(result => {
                this.tags = JSON.parse(result._body);
            });
    }

    delete(tag: ITag) {
        this.tagsService.delete(tag)
            .subscribe(() => {
                this.get();
            });
    }
}
