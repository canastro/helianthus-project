'use strict';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/root';
import configureStore from './store/config-store';

const store = configureStore();

render(
    <Root store={store} />,
    document.getElementById('app')
);
