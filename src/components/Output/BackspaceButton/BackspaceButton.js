import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BackspaceButton extends Component {
  static propTypes = {};

  render() {
    const { classes, ...other } = this.props;

    return (
      <button aria-label="Backspace" {...other}>
        backspace
      </button>
    );
  }
}

export default BackspaceButton;
