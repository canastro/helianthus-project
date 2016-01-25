'use strict';

import React, { Component, PropTypes } from 'react';
import Figure from '../figure/figure';

require('!style!css!sass!./gallery.scss');

export default class Gallery extends Component {

  render () {

      const { photos } = this.props;

      const figures = photos.list.map((photo) => {
          return (
              <Figure photo={photo} />
          );
      });

      return (
          <div className="gallery-container">
              <div className="figures-container gallery-grid">
                  {figures}
              </div>

              <footer>
                  <p>© 2015 CÁTIA CANASTRO | ALL RIGHTS RESERVED | PORTUGAL</p>
              </footer>

          </div>
      );
  }
}

Gallery.propTypes = {
    photos: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};
