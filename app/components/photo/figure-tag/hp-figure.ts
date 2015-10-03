/* global $, jQuery */

import {Directive, ElementRef, EventEmitter} from 'angular2/angular2';
import {CommentsService} from '../../../services/comments';
import {IPhoto} from '../../../interfaces/photo';

@Directive({
  selector: '[hp-figure]',
  properties: [
      'photo: photo',
      'message: message'
  ],
  host: {
      '(click)': 'onMouseDown($event)'
  },
  events: [
      'tagAdded',
      'startTag'
  ]
})

export class HpFigure {

    position: any;

    tagAdded = new EventEmitter();
    startTag = new EventEmitter();

    photo: IPhoto;
    $container: JQuery;

    constructor(
        private el: ElementRef,
        private commentsService: CommentsService
    ) {
        this.$container = $(this.el.nativeElement);
    }

    onMouseDown($event) {

        if (!$($event.target).hasClass('photo-img')) {
            return;
        }

        // The user is going to start drawing. Cancel
        // the default event to make sure the browser
        // does not try to select the IMG object.
        $event.preventDefault();

        // Add the pending tag to the container.
        this.position = this.getLocalPosition($event.clientX, $event.clientY);

        this.startTag.next(this.position);
    }

    set message(item) {

        if (!item) {
            return;
        }

        item.left = this.position.left;
        item.top = this.position.top;

        this.commentsService.commentPhoto(this.photo, item);

        this.tagAdded.next(item);
    }

    private getLocalPosition(mouseX, mouseY) {

         // Get the current position of the container.
        let containerOffset = this.$container.offset();

        // Adjust the client coordiates to acocunt for
        // the offset of the page and the position of the
        // container.
        let localPosition = {
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
