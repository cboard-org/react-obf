import React, { PureComponent } from 'react';

import ButtonBase from '../../ButtonBase/ButtonBase';
import ClearSvg from './ClearSvg';

export class ClearButton extends PureComponent {
  render() {
    return (
      <ButtonBase aria-label="Clear" title="Clear" {...this.props}>
        <ClearSvg />
      </ButtonBase>
    );
  }
}

export default ClearButton;
