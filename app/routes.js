'use strict';

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/app';
import Home from './components/home/home';

// <Route path="/about" component={requireAuthentication(SignInContainer, false)}/>
// <Route path="/photo/:id" component={requireAuthentication(SignInContainer, false)}/>

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>



    </Route>
);
