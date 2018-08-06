import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Tile.css';

const propTypes = {
  /**
   * Background color
   */
  background_color: PropTypes.string,
  /**
   * Border color
   */
  border_color: PropTypes.string,
  /**
   * Tile content
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Type of tile
   */
  variant: PropTypes.oneOf(['button', 'folder'])
};

const defaultProps = {};

const Tile = props => {
  const { background_color, border_color, children, className, style, variant, ...other } = props;

  const folder = variant === 'folder';

  const tileStyle = {
    ...style,
    backgroundColor: background_color,
    borderColor: border_color
  };

  return (
    <div className="Tile" style={tileStyle} {...other}>
      {children}
    </div>
  );
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
