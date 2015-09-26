/// <reference path='../../../typings/angular2/angular2.d.ts' />
import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {PhotosService} from '../../services/photos';
import {CommentsService} from '../../services/comments';

import {HpFigure} from '../../directives/hp-figure';
import {HpFigureTag} from '../../directives/hp-figure-tag';
import {HpFigureTagMessage} from '../../directives/hp-figure-tag-message';
import {HpTooltip} from '../../directives/hp-tooltip';

import {RouteParams, Router} from 'angular2/router';

// Annotation section
@Component({
    selector: 'photo'
})

@View({
    directives: [NgFor, NgIf, HpFigure, HpFigureTag, HpFigureTagMessage, HpTooltip],
    templateUrl: 'components/photo/photo.html'
})

// Component controller
export class Photo {

    photoId: any;
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
            .subscribe(result => {
                this.figureTags = result.map((item) => {
                    return {
                        message: item.message,
                        position: {
                            left: item.positionX,
                            top: item.positionY
                        }
                    };
                });
            });
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

    tagAdded(tag) {
        this.figureTags.push(tag);
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
