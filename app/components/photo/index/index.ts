
import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {PhotosService} from '../../../services/photos';
import {CommentsService} from '../../../services/comments';

import {FigureTagForm} from '../figure-tag/figure-tag-form/figure-tag-form';

import {HpFigure} from '../figure-tag/hp-figure';
import {HpFigureTag} from '../figure-tag/hp-figure-tag';
import {HpFigureTagMessage} from '../figure-tag/hp-figure-tag-message';
import {HpTooltip} from '../../common/tooltip/hp-tooltip';

import {RouteParams, Router} from 'angular2/router';

// Annotation section
@Component({
    selector: 'photo'
})

@View({
    directives: [NgFor, NgIf, HpFigure, HpFigureTag, HpFigureTagMessage, HpTooltip, FigureTagForm],
    templateUrl: 'components/photo/index/index.html'
})

// Component controller
export class Photo {

    tempMessage: Object;
    tempTagPosition: Object;
    isCommenting: boolean = false;

    photoId: String;
    tagsOn: boolean = false;
    photo: Object;
    figureTags: Array<Object>;
    selectedTag: Object;
    selectedTagMessage: String;

    constructor(
        private router: Router,
        params: RouteParams,
        private photosService: PhotosService,
        private commentsService: CommentsService
    ) {
        this.photoId = params.get('id');

        this.figureTags = [];

        photosService.find(this.photoId).subscribe(result => {
            this.photo = result;
        });

        commentsService.getCommentsByPhotoId(this.photoId)
            .subscribe(result => this.figureTags = result);
    }

    onInit() {

        if (window['DISQUS']) {
            window['DISQUS'].reset({
                reload: true,
                config: function () {
                    this.page.identifier = this.photoId;
                    this.page.url = document.URL;
                }
            });
            return;
        }

        window['disqus_shortname'] = 'helianthus-project';
        window['disqus_identifier'] = this.photoId;

        let dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + window['disqus_shortname'] + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

    }

    startTagForm($event) {
        this.tempMessage = null;
        this.isCommenting = true;
        this.tempTagPosition = $event;
    }

    onMessageSubmited($event) {
        this.tempMessage = $event;
    }

    onClose() {
        this.isCommenting = false;
    }

    tagAdded(tag) {
        this.figureTags.push(tag);
        this.isCommenting = false;
    }

    showTag(tag) {
        this.selectedTag = tag;
        this.selectedTagMessage = tag.message;
    }

    hideTag(params) {
        this.selectedTag = null;
        this.selectedTagMessage = null;
    }

    toggleTags($event) {

        $event.preventDefault();
        $event.stopPropagation();

        this.tagsOn = !this.tagsOn;
    }

    navigateBack() {
        /*
            import {Location} from 'angular2/router';
            export class Example {
              location: Location;
              constructor(location: Location) {
                location.back();
              }
            }
        */
    }
}
