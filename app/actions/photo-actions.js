'use strict';

import { CALL_API } from '../middleware/api';
import { PHOTOS } from '../constants/env-constants';

/*
 * action types
 */
export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';

function loadFetch(page = 1, perPage = 10, showHidden = false) {

    return {
        [CALL_API]: {
            types: [
                FETCH_PHOTOS_REQUEST,
                FETCH_PHOTOS_SUCCESS,
                FETCH_PHOTOS_FAILURE
            ],
            endpoint: `${PHOTOS}?per_page=${perPage}&page=${page}&show_hidden=${showHidden}`,
            method: 'GET'
        }
    };
}

// Relies on Redux Thunk middleware.
export function fetch(index, limit) {
    return (dispatch, getState) => {
        return dispatch(loadFetch(index, limit));
    };
}
