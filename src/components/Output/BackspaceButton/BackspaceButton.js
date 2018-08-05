import React, { Component } from 'react';

export class BackspaceButton extends Component {
  static propTypes = {};

  render() {
    return (
      <button aria-label="Backspace" {...this.props}>
        backspace
      </button>
    );
  }
}

export default BackspaceButton;
