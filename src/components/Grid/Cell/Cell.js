import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Cell.css';

const propTypes = {
  children: PropTypes.node
};

function Cell(props) {
  const { className: classNameProp, ...other } = props;
  const className = classNames('Cell', classNameProp);

  return <div className={className} {...other} />;
}

Cell.propTypes = propTypes;

export default Cell;
