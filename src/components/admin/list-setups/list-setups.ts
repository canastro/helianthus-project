/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {
    FormBuilder,
    Component,
    View,
    NgFor
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

import {ISetup} from '../../../interfaces/setup';
import {SetupsService} from '../../../services/setups';

// annotation section
@Component({
    selector: 'list-setups',
    viewBindings: [
        FormBuilder
    ]
})

@View({
    directives: [ROUTER_DIRECTIVES, RouterLink, NgFor],
    templateUrl: 'components/admin/list-setups/list-setups.html'
})

export class ListSetups {

    setups: Array<ISetup>;

    constructor(
        private setupsService: SetupsService,
        private router: Router
    ) {

        this.get();
    }

    get() {
        this.setupsService.getAllSetups()
            .subscribe(result => {
                this.setups = JSON.parse(result._body);
            });
    }

    delete(setup: ISetup) {
        this.setupsService.delete(setup)
            .subscribe(() => {
                this.get();
            });
    }
}
