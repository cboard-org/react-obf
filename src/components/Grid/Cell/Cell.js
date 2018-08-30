import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Cell.css';

const propTypes = {
  children: PropTypes.node
};

function Cell(props) {
  const { className, ...other } = props;
  const cellClassName = classNames('Cell', className);

  return <div className={cellClassName} {...other} />;
}

Cell.propTypes = propTypes;

export default Cell;
