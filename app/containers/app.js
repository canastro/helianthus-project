'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

require('!style!css!sass!./app.scss');

class App extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        const { children } = this.props;

        return (

            <div className="app-container">


                {children}
            </div>
        );
    }
}

App.propTypes = {
    // Injected by React Router
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {})(App);
