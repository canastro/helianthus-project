import {IPhoto} from './photo';

export interface IComment {
    _id?: String;
    name: String;
    message: String;
    positionX: Number;
    positionY: Number;
    photo?: IPhoto;
}
