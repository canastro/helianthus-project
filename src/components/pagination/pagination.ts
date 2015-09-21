/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, EventEmitter} from 'angular2/angular2';

// Annotation section
@Component({
    selector: 'pagination',
    properties: ['nPages: pages'],
    events: ['pageSelected']
})

@View({
  templateUrl: 'components/pagination/pagination.html',
  directives: [NgFor]
})

export class Pagination {

    selectedPage: number = 0;
    pages: Array<any> = [];
    photo: any;
    pageSelected = new EventEmitter();

    constructor(
    ){
    }

    set nPages(nPages) {

        if (!nPages) {
            return;
        }

        //Typescript doesnt allow: Array.from({length: nPages}, (v, k) => k);
        for (var i = 1; i <= nPages; i++) {
            this.pages.push({
                number: i
            });
        }

        this.pages[0].isSelected = true;
        this.selectedPage = this.pages[0].number;

    }

    private reset() {
        this.pages.forEach(function (item) {
            item.isSelected = false;
        });
    }

    selectPage(page) {

        this.reset();

        this.selectedPage = page.number;
        page.isSelected = true;

        this.pageSelected.next(page.number);
    }

    previous() {

        var previous = this.selectedPage - 2;

        if (previous >= 0) {
            this.selectPage(this.pages[previous]);
        }
    }

    next() {

        if (this.selectedPage < this.pages.length) {
            this.selectPage(this.pages[this.selectedPage]);
        }
    }
}
