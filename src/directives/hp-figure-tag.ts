/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/*global $, jQuery*/

import {Directive, ElementRef, EventEmitter} from 'angular2/angular2';

//TODO: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Directive({
  selector: '[hp-figure-tag]',
  properties: ['tag: tag'],
  host: {
      '(mouseover)': 'onTagMouseOver($event)',
      '(mouseout)': 'onTagMouseOut($event)'
  },
  events: ['tagOver', 'tagOut']
})

export class HpFigureTag{

    $container: any;
    message: String;

    tagOver = new EventEmitter();
    tagOut = new EventEmitter();

    constructor(private el: ElementRef){
        this.$container = $(this.el.nativeElement);
    }

    set tag(tag) {
        this.$container.css(tag.position);
    }

    private onTagMouseOver($event) {
        this.tagOver.next(this.tag);
    }

    private onTagMouseOut($event) {
        this.tagOut.next(null);
    }
}
