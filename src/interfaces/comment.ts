import {Photo} from './photo';

export interface Comment {
    _id?: number,
    name: String,
    message: String,
    positionX: Number,
    positionY: Number,
    photo?: Photo
}
