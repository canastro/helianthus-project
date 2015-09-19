/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/*global $, jQuery*/

import {Directive, ElementRef, EventEmitter} from 'angular2/angular2';
// import * as $ from 'jquery';

//TODO: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Directive({
  selector: '[hp-figure]',
  host: {
      '(mousedown)': 'onMouseDown($event)'
  },
  events: ['tagAdded']
})

export class HpFigure{

    tagAdded = new EventEmitter();
    $container: any;

    constructor(private el: ElementRef){
        this.$container = $(this.el.nativeElement);
    }

    onMouseDown($event){

        var position;
        var tag;
        var promptResult;

        // The user is going to start drawing. Cancel
        // the default event to make sure the browser
        // does not try to select the IMG object.
        $event.preventDefault();

        // Add the pending tag to the container.
        position = this.getLocalPosition($event.clientX, $event.clientY);

        promptResult = prompt("Message:");

        this.tagAdded.next({
            message: promptResult,
            position: position
        });
    }


    private getLocalPosition(mouseX, mouseY) {

        // Adjust the client coordiates to acocunt for
        // the offset of the page and the position of the
        // container.
        var localPosition = {
            left: Math.floor(
                mouseX + window.scrollX
            ),
            top: Math.floor(
                mouseY + window.scrollY
            )
        };

        // Return the local position of the mouse.
        return localPosition;
    }
}
