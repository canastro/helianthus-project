/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/*global $, jQuery*/

import {Directive, ElementRef} from 'angular2/angular2';
// import * as $ from 'jquery';

//TODO: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Directive({
  selector: '[inline-comment]',
  host: {
      '(mousedown)': 'onMouseDown($event)'
  }
})



export class InlineComment{

    $container: any;

    constructor(private el: ElementRef){
        this.$container = $(this.el.nativeElement);
    }

    onMouseDown($event){

        var position;

        // The user is going to start drawing. Cancel
        // the default event to make sure the browser
        // does not try to select the IMG object.
        $event.preventDefault();

        // Add the pending tag to the container.
        position = this.getLocalPosition($event.clientX, $event.clientY);

        // Create the new tag.
        var tag = $( "<a class='inline-comment inline-comment-selected'><br /></a>" );

        // Set the absolute positon (within the container).
        tag.css({
            left: (position.left + "px"),
            top: (position.top + "px")
        });

        // Set the anchor points for the tag. This is the
        // point from which the drawing will be made
        // (regardless of technical position).
        tag.data({
            anchorLeft: position.left,
            anchorTop: position.top
        });

        this.$container.append(tag);
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
