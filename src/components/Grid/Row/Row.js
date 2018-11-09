import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Row.css';

const propTypes = {
  children: PropTypes.node
};

function Row(props) {
  const { className: classNameProp, ...other } = props;
  const className = classNames('Row', classNameProp);

  return <div className={className} {...other} />;
}

Row.propTypes = propTypes;

export default Row;
