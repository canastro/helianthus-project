/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/* global $, jQuery */

import {Directive, ElementRef} from 'angular2/angular2';

// TODO: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Directive({
  selector: '[hp-tooltip]',
  host: {
      '(mouseover)': 'onMouseOver($event)'
  }
})

export class HpTooltip {

    // @TODO: cant set $container: JQuery because it says JQuery does not container
    // a function called tooltip
    $container: any;

    constructor(
        private el: ElementRef
    ) {
        this.$container = $(this.el.nativeElement);
    }

    onMouseOver() {
        this.$container.tooltip('toggle');
    }
}
