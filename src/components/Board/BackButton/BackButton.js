import React from 'react';

import ButtonBase from '../../ButtonBase/ButtonBase';
import ArrowBackSvg from './ArrowBackSvg';
import './BackButton.css';

const BackButton = props => {
  const { children, className, ...other } = props;

  return (
    <ButtonBase className="BackButton" title="Click to go back" {...other}>
      <ArrowBackSvg />
    </ButtonBase>
  );
};

export default BackButton;
