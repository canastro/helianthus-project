'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import DevTools from '../containers/dev-tools';
import createHistory from 'history/lib/createHashHistory';
import routes from '../routes';
import thunk from 'redux-thunk';
import api from '../middleware/api';
// import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import perflogger from 'redux-perf-middleware';

const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    reduxReactRouter({ routes, createHistory }),
    // applyMiddleware(createLogger()),
    applyMiddleware(perflogger),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
