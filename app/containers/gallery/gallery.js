'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Gallery from '../../components/gallery/gallery';
import { fetch } from '../../actions/photo-actions';

export default class GalleryContainer extends Component {

    componentDidMount () {
        this.props.fetch();
    }

    render () {
        const {
            photos,
            isFetching
        } = this.props;

        return (
            <Gallery
                photos={photos}
                fetch={this.props.fetch}
                isFetching={isFetching}/>
        );
    }
}

GalleryContainer.propTypes = {
    // Injected by React Redux
    isFetching: PropTypes.bool.isRequired,
    photos: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.agreement.isFetching,

        photos: state.agreement.list
    };
}

export default connect(mapStateToProps, {
    fetch
})(GalleryContainer);
