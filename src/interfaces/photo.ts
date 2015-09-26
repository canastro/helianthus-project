import {Category} from './category';
import {Setup} from './setup';
import {Tag} from './tag';

export interface Photo {
    _id?: number;
    name: String;
    title: String;
    description: String;
    story?: String;
    date: Date;
    likes?: Number;
    views?: Number;
    local?: any;
    category?: Category;
    setup?: Setup;
    tags?: Array<Tag>;
};
