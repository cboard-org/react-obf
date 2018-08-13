import React from 'react';

import ButtonBase from '../../ButtonBase/ButtonBase';
import './BoardButton.css';

const BoardButton = props => {
  const { children, className, ...other } = props;

  return (
    <ButtonBase className="BoardButton" {...other}>
      {children}
    </ButtonBase>
  );
};

export default BoardButton;
