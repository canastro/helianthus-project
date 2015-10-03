
import {
    FORM_DIRECTIVES,
    EventEmitter,
    ElementRef,
    FormBuilder,
    Validators,
    ControlGroup,
    Component,
    View,
    NgFor,
    NgIf
} from 'angular2/angular2';

// annotation section
@Component({
    selector: 'figure-tag-form',
    viewBindings: [
        FormBuilder
    ],
    properties: ['position: position'],
    host: {
        '(toggleTagForm)': 'onToggleTagForm()',
        '(onMouseDown)': 'onMouseDown($event)'
    },
    events: [
        'onMessageSubmited'
    ]
})

@View({
    directives: [FORM_DIRECTIVES, NgFor, NgIf],
    templateUrl: 'components/photo/figure-tag/figure-tag-form/figure-tag-form.html'
})

export class FigureTagForm {

    $container: JQuery;
    charactersLeft: number = 140;
    onMessageSubmited = new EventEmitter();
    figureTagForm: ControlGroup;

    private maxLength: number = 140;

    constructor(
        private el: ElementRef,
        private formBuilder: FormBuilder
    ) {

        this.figureTagForm = formBuilder.group({
            name: ['', Validators.required],
            message: ['', Validators.required]
        });

        this.$container = $(this.el.nativeElement).children(':first');
    }

    set position(pos) {

        if (!pos) {
            return;
        }

        this.$container.css(pos);

        this.figureTagForm.controls['name'].updateValue('');
        this.figureTagForm.controls['message'].updateValue('');
    }

    onMouseDown($event) {
        $event.preventDefault();
        $event.stopPropagation();
    }

    onMessageKeyDown($event) {

        let currentMessageLength = this.figureTagForm.controls['message'].value.length;

        if ($event.keyCode === 13 && currentMessageLength) {
            this.onMessageSubmited.next(this.figureTagForm.value);
            return;
        }

        this.charactersLeft = this.maxLength - currentMessageLength;

        if (this.charactersLeft === 0) {
            $event.preventDefault();
        }

    }
}
