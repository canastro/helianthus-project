'use strict';

import React, { Component, PropTypes } from 'react';

require('!style!css!sass!./figure.scss');

export default class Figure extends Component {

  render () {

      const { photo } = this.props;

      return (
          <figure className="gallery-figure effect-zoe">
              <img src={`/static/${photo.name}`} alt={photo.title}/>

              <figcaption>
                  <h4>{photo.title}</h4>

                  <div className="icon-links">
                      <a href="#"><i className="fa fa-facebook-square"></i></a>
                      <a href="#"><i className="fa fa-heart"></i></a>
                  </div>

                  <p className="gallery-item-description">{photo.description}</p>

              </figcaption>

          </figure>
      );
  }
}

Figure.propTypes = {
    photo: PropTypes.object.isRequired
};
