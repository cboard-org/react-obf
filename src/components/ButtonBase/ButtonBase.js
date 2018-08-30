import React from 'react';
import classNames from 'classnames';

import './ButtonBase.css';

const ButtonBase = props => {
  const { children, className, ...other } = props;

  const buttonClassName = classNames('ButtonBase', className);

  return (
    <button className={buttonClassName} type="button" {...other}>
      {children}
    </button>
  );
};

export default ButtonBase;
