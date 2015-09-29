import {IPhoto} from './photo';

export interface IComment {
    _id?: String;
    name: String;
    message: String;
    left: Number;
    top: Number;
    photo?: IPhoto;
}
