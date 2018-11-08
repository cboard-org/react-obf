import React, { PureComponent } from 'react';
import classNames from 'classnames';

import ClearSvg from './ClearSvg';
import './ClearButton.css';

export class ClearButton extends PureComponent {
  render() {
    const { className, ...other } = this.props;

    const clearButtonClassName = classNames('ClearButton', className);

    return (
      <button className={clearButtonClassName} aria-label="Clear" title="Clear" {...other}>
        <ClearSvg width="3em" height="3em" />
      </button>
    );
  }
}

export default ClearButton;
