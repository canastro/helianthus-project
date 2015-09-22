/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/*global $, jQuery*/

import {Directive, ElementRef, EventEmitter} from 'angular2/angular2';
// import * as $ from 'jquery';

@Directive({
  selector: '[hp-load-more]',
  host: {
      '(scroll)': 'onScroll($event)'
  },
  events: ['loadMore']
})

export class HpLoadMore{

    photo: any;
    loadMore = new EventEmitter();
    $container: any;

    constructor(
        private el: ElementRef
    ){
        this.$container = $(this.el.nativeElement);
    }

    onScroll($event) {

        if (this.$container[0].offsetHeight + this.$container[0].scrollTop >= this.$container[0].scrollHeight) {
            this.loadMore.next(null);
        }
    }
}
