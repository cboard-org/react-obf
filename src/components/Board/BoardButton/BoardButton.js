import React from 'react';

import './BoardButton.css';

const BoardButton = props => {
  const { children, className, ...other } = props;

  return (
    <button className="BoardButton" type="button" {...other}>
      {children}
    </button>
  );
};

export default BoardButton;
