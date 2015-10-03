
import {
    Component,
    View,
    NgFor,
    NgIf
} from 'angular2/angular2';

import {IPhoto} from '../../../interfaces/photo';
import {IComment} from '../../../interfaces/comment';

import {CommentsService} from '../../../services/comments';

// annotation section
@Component({
    selector: 'list-comments',
    properties: ['photo: photo']
})

@View({
    directives: [NgFor, NgIf],
    templateUrl: 'components/admin/list-comments/list-comments.html'
})

export class ListComments {

    photoId: String;
    comments: Array<IComment>;

    constructor(
        private commentsService: CommentsService
    ) {

    }

    set photo(photo: IPhoto) {

        if (!photo) {
            return;
        }

        this.photoId = photo._id;

        this.getComments();
    }

    getComments() {

        this.commentsService.getCommentsByPhotoId(this.photoId)
            .subscribe(result => this.comments = result);
    }

    delete(comment: IComment) {

        if (!comment) {
            return;
        }

        this.commentsService.delete(comment)
            .subscribe(() => {
                this.getComments();
            });
    }
}
