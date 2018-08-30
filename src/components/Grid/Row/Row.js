import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Row.css';

const propTypes = {
  children: PropTypes.node
};

function Row(props) {
  const { className, ...other } = props;
  const rowClassName = classNames('Row', className);

  return <div className={rowClassName} {...other} />;
}

Row.propTypes = propTypes;

export default Row;
