import React from 'react';
import PropTypes from 'prop-types';

import './BoardButton.css';

const propTypes = {};

const defaultProps = {};

const BoardButton = props => {
  const { children, className, ...other } = props;

  return (
    <button className="BoardButton" type="button" {...other}>
      {children}
    </button>
  );
};

BoardButton.propTypes = propTypes;
BoardButton.defaultProps = defaultProps;

export default BoardButton;
