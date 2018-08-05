/**
 * @class Cell
 */

import React from 'react';
import PropTypes from 'prop-types';

import './Cell.css';

const propTypes = {
  children: PropTypes.node
};

function Cell(props) {
  return <div className="Cell">{props.children}</div>;
}

Cell.propTypes = propTypes;

export default Cell;
