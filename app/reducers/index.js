'use strict';

import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import photo from './photo';

const rootReducer = combineReducers({
    router,
    photo
});

export default rootReducer;
