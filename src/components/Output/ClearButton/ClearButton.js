import React, { Component } from 'react';

export class ClearButton extends Component {
  render() {
    return (
      <button aria-label="Clear" {...this.props}>
        clear
      </button>
    );
  }
}

export default ClearButton;
