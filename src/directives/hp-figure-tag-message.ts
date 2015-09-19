/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/*global $, jQuery*/

import {Directive, ElementRef, EventEmitter} from 'angular2/angular2';

//TODO: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Directive({
  selector: '[hp-figure-tag-message]',
  properties: ['tag: tag']
})

export class HpFigureTagMessage{

    $container: any;

    constructor(private el: ElementRef){
        this.$container = $(this.el.nativeElement);
    }

    set tag(tag) {
        if (tag) {
            this.$container.css(tag.position);
        }
    }

}
