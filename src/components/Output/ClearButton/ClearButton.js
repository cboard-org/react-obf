import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ClearButton extends Component {
  static propTypes = {};

  render() {
    const { classes, ...other } = this.props;

    return (
      <button aria-label="Clear" {...other}>
        clear
      </button>
    );
  }
}

export default ClearButton;
