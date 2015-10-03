/* global $, jQuery */

import {Component, View, ElementRef} from 'angular2/angular2';

// Annotation section
@Component({
    selector: 'settings'
})

@View({
    templateUrl: 'components/home/settings/settings.html'
})

// TODO: https://github.com/codrops/ButtonComponentMorph/blob/master/index7.html
// TODO: https://github.com/codrops/ButtonComponentMorph/blob/master/js/uiMorphingButton_fixed.js
// TODO: remove classie dependency because I already have jquery
// Component controller
export class Settings {

    isOpen: boolean = false;
    $container: JQuery;

    constructor(private el: ElementRef) {
        this.$container = $(this.el.nativeElement);
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;

        $('body').toggleClass('show-menu');
    }

}
