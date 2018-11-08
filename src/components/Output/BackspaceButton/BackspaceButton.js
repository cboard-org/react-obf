import React, { PureComponent } from 'react';
import classNames from 'classnames';

import BackspaceSvg from './BackspaceSvg';
import './BackspaceButton.css';

class BackspaceButton extends PureComponent {
  render() {
    const { className: classNameProp, ...other } = this.props;

    const className = classNames('BackspaceButton', classNameProp);

    return (
      <button className={className} aria-label="Backspace" title="Backspace" {...other}>
        <BackspaceSvg width="3em" height="3em" />
      </button>
    );
  }
}

export default BackspaceButton;
