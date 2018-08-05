/**
 * @class Row
 */

import React from 'react';
import PropTypes from 'prop-types';

import './Row.css';

const propTypes = {
  children: PropTypes.node
};

function Row(props) {
  return <div className="Row">{props.children}</div>;
}

Row.propTypes = propTypes;

export default Row;
