'use strict';

import { HttpClass } from './http';

//TODO: IMPLEMENT SCHEMAS:
//https://github.com/rackt/redux/blob/5b94a18f560eff60ce37ae01d1b16387bcfb8e3a/examples/real-world/middleware/api.js
// import { Schema, arrayOf, normalize } from 'normalizr'

let httpInstance;

function getHttpInstance() {
    if (httpInstance) {
        return httpInstance;
    }

    httpInstance = new HttpClass();

    return httpInstance;
}


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, method, body) {

    const http = getHttpInstance();
    const params = {
        body
    };

    return http[method.toLowerCase()](endpoint, params)
        .then((result) => {

            if (result.error) {
                return Promise.reject(result);
            }

            return result;
        });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint } = callAPI;
    const { method, body, types } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return callApi(endpoint, method, body).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        response => {
            next(actionWith({
                type: failureType,
                error: response.error
            }));
            throw response;
        }
    );
};
