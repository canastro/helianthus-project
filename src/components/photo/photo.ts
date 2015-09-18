/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, Inject, NgFor, NgIf} from 'angular2/angular2';
import {PhotosService} from '../../services/photos';
import {InlineComment} from '../../directives/inline-comment';
import {RouteParams} from 'angular2/router';

// Annotation section
@Component({
  selector: 'photo'
})

@View({
  templateUrl: 'components/photo/photo.html',
  directives: [NgFor, NgIf, InlineComment]
})

// Component controller
export class Photo {

    photo: Object;

    constructor(
        params: RouteParams,
        private photosService: PhotosService
    ){
        var id = params.get('id');

        photosService.find(id).subscribe(result => {
            this.photo = result;
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
}
