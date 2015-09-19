/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgFor, NgIf} from 'angular2/angular2';
import {PhotosService} from '../../services/photos';
import {CommentsService} from '../../services/comments';
import {HpFigure} from '../../directives/hp-figure';
import {HpFigureTag} from '../../directives/hp-figure-tag';
import {HpFigureTagMessage} from '../../directives/hp-figure-tag-message';
import {RouteParams} from 'angular2/router';

// Annotation section
@Component({
  selector: 'photo'
})

@View({
  templateUrl: 'components/photo/photo.html',
  directives: [NgFor, NgIf, HpFigure, HpFigureTag, HpFigureTagMessage]
})

// Component controller
export class Photo {

    photo: Object;
    figureTags: Array<Object>;
    selectedTag: Object;
    selectedTagMessage: String;

    constructor(
        params: RouteParams,
        private photosService: PhotosService,
        private commentsService: CommentsService
    ){
        var id = params.get('id');

        this.figureTags = [];

        photosService.find(id).subscribe(result => {
            this.photo = result;
        });

        commentsService.getCommentsByPhotoId(id)
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

        if (window["DISQUS"]) {
            window["DISQUS"].reset({
                reload: true,
                config: function () {
                    this.page.identifier = id;
                }
            });
            return;
        }

        window['disqus_shortname'] = 'helianthus-project';
        window['disqus_identifier'] = id;

        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
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
}
