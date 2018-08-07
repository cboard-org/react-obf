import React from 'react';
import PropTypes from 'prop-types';

import './BackButton.css';

const propTypes = {};

const defaultProps = {};

const BackButton = props => {
  const { children, className, ...other } = props;

  return (
    <button className="BackButton" type="button" {...other}>
      back
    </button>
  );
};

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;
