import React, { PureComponent } from 'react';
import classNames from 'classnames';

import ButtonBase from '../ButtonBase/ButtonBase';
import BackspaceSvg from './BackspaceSvg';
import './BackspaceButton.css';

class BackspaceButton extends PureComponent {
  static propTypes = {};

  render() {
    const { className, ...other } = this.props;

    const backspaceButtonClassName = classNames('BackspaceButton', className);

    return (
      <ButtonBase
        className={backspaceButtonClassName}
        aria-label="Backspace"
        title="Backspace"
        {...other}
      >
        <BackspaceSvg width="3em" height="3em" />
      </ButtonBase>
    );
  }
}

export default BackspaceButton;
