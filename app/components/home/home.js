'use strict';

import React, { Component} from 'react';
import GalleryContainer from '../../containers/gallery/gallery';

export default class Home extends Component {

    render () {

        return (
            <section className="content-container">
                <GalleryContainer />
            </section>
        );
    }
}
