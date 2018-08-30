import React, { PureComponent } from 'react';
import classNames from 'classnames';

import ButtonBase from '../ButtonBase/ButtonBase';
import HomeSvg from './HomeSvg';
import './HomeButton.css';

class HomeButton extends PureComponent {
  render() {
    const { className, ...other } = this.props;

    const HomeButtonClassName = classNames('HomeButton', className);

    return (
      <ButtonBase className={HomeButtonClassName} title="Click to go home" {...other}>
        <HomeSvg width="1.5em" height="1.5em" />
      </ButtonBase>
    );
  }
}

export default HomeButton;
