import React, { PureComponent } from 'react';
import classNames from 'classnames';

import ButtonBase from '../ButtonBase/ButtonBase';
import ArrowBackSvg from './ArrowBackSvg';
import './BackButton.css';

class BackButton extends PureComponent {
  render() {
    const { className, ...other } = this.props;

    const backButtonClassName = classNames('BackButton', className);

    return (
      <ButtonBase className={backButtonClassName} title="Click to go back" {...other}>
        <ArrowBackSvg width="1.5em" height="1.5em" />
      </ButtonBase>
    );
  }
}

export default BackButton;
