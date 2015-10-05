import {
    Component,
    View,
    NgFor
} from 'angular2/angular2';

import {IPhoto} from '../../../../interfaces/photo';

// annotation section
@Component({
    selector: 'photos-thumbnails',
    properties: ['photos: photos']
})

@View({
    directives: [NgFor],
    templateUrl: 'components/admin/album/photos-thumbnails/photos-thumbnails.html'
})

export class PhotosThumbnails {

    private _photos: Array<IPhoto> = [];

    setPhoto(photos: Array<IPhoto>) {
        this._photos = photos || [];
    }

}
