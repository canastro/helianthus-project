import {ICategory} from './category';
import {ISetup} from './setup';
import {ITag} from './tag';

export interface IPhoto {
    _id?: String;
    name: String;
    title: String;
    description: String;
    story?: String;
    date: String;
    likes?: Number;
    views?: Number;
    local?: String;
    category?: ICategory;
    setup?: ISetup;
    tags?: Array<ITag>;
    isActive: boolean;
};
