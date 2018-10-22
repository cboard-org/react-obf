import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Symbol.css';

const propTypes = {
  /**
   * Image src to display
   */
  src: PropTypes.string,
  /**
   * Label to display
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

function Symbol(props) {
  const { className, label, src, ...other } = props;

  const symbolClassName = classNames('Symbol', className);

  return (
    <div className={symbolClassName} {...other}>
      {src && (
        <div className="Symbol__image-container">
          <img className="Symbol__image" src={src} alt="" key={src} />
        </div>
      )}
      <div className="Symbol__label">{label}</div>
    </div>
  );
}

Symbol.propTypes = propTypes;

export default Symbol;
