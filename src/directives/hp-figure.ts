/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/*global $, jQuery*/

import {Directive, ElementRef, EventEmitter} from 'angular2/angular2';
import {CommentsService} from '../services/comments';
// import * as $ from 'jquery';

//TODO: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Directive({
  selector: '[hp-figure]',
  properties: ['photo: photo'],
  host: {
      '(click)': 'onMouseDown($event)'
  },
  events: ['tagAdded']
})

export class HpFigure{

    photo: any;
    tagAdded = new EventEmitter();
    $container: any;


    constructor(
        private el: ElementRef,
        private commentsService: CommentsService
    ){
        this.$container = $(this.el.nativeElement);
    }

    onMouseDown($event){

        var position;
        var tag;
        var promptResult;
        var params;

        // The user is going to start drawing. Cancel
        // the default event to make sure the browser
        // does not try to select the IMG object.
        $event.preventDefault();

        // Add the pending tag to the container.
        position = this.getLocalPosition($event.clientX, $event.clientY);

        promptResult = prompt("Message:");

        params = {
            message: promptResult,
            position: position
        };

        this.commentsService.commentPhoto(this.photo, params)

        this.tagAdded.next(params);
    }


    private getLocalPosition(mouseX, mouseY) {

         // Get the current position of the container.
        var containerOffset = this.$container.offset();

        // Adjust the client coordiates to acocunt for
        // the offset of the page and the position of the
        // container.
        var localPosition = {
            left: Math.floor(
                mouseX - containerOffset.left + window.scrollX
            ),
            top: Math.floor(
                mouseY - containerOffset.top + window.scrollY
            )
        };

        // Return the local position of the mouse.
        return localPosition;
    }
}
