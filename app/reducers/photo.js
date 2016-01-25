'use strict';

import {
    FETCH_AGREEMENTS_REQUEST,
    FETCH_AGREEMENTS_SUCCESS,
    FETCH_AGREEMENTS_FAILURE
} from '../actions/photo-actions';

const defaultState = {
    list: {
        items: [],
        hasMore: false
    },
    isFetching: false,
    error: {}
};

function handleFetch(state, action) {

    if (action.error) {
        return handleError(state, action);
    }

    if (action.response) {

        return {
            ... state,
            list: {
                items: action.response.photos,
                hasMore: action.response.hasMore
            },
            isFetching: false,
            error: {}
        };
    }

    return state;
}

function handleError(state, action) {

    if (typeof action.error === 'string') {
        action.error = {
            global: action.error
        };
    }

    return {
        ... state,
        error: action.error || {},
        isFetching: false
    };
}

export default function content(state = defaultState, action) {

    switch (action.type) {

        case FETCH_AGREEMENTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case FETCH_AGREEMENTS_SUCCESS:
            return handleFetch(state, action);

        case FETCH_AGREEMENTS_FAILURE:
            return handleError(state, action);

        default:
            return state;
    }
}
