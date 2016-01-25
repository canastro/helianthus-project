'use strict';

import React, { Component} from 'react';
import { Link } from 'react-router';

require('!style!css!sass!./navbar.scss');

export default class NavBar extends Component {

    render () {

        return (
            <nav className="navbar navbar-dark bg-inverse">

                <ul className="nav navbar-nav">
                    <Link className="nav-item">
                        Home <span className="sr-only">(current)</span></a>
                    </Link>
                    <Link className="nav-item">
                        Albums
                    </Link>
                    <Link className="nav-item">
                        About
                    </Link>
                </ul>
            </nav>
        );
    }
}
