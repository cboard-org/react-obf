import React from 'react';

import './BackButton.css';

const BackButton = props => {
  const { children, className, ...other } = props;

  return (
    <button className="BackButton" type="button" {...other}>
      back
    </button>
  );
};

export default BackButton;
