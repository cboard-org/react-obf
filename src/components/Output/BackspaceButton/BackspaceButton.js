import React, { PureComponent } from 'react';

import ButtonBase from '../../ButtonBase/ButtonBase';
import BackspaceSvg from './BackspaceSvg';

export class BackspaceButton extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <ButtonBase aria-label="Backspace" title="Backspace" {...this.props}>
        <BackspaceSvg />
      </ButtonBase>
    );
  }
}

export default BackspaceButton;
