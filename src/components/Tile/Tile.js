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
  type: PropTypes.oneOf(['folder'])
};

const defaultProps = {};

const Tile = props => {
  const { background_color, border_color, children, className, style, type, ...other } = props;

  const folder = type === 'folder';

  const tileStyle = {
    ...style,
    backgroundColor: background_color,
    borderColor: border_color
  };

  const tileClassName = classNames('Tile', className, {
    'Tile--folder': folder
  });

  return (
    <div className={tileClassName} style={tileStyle} {...other}>
      {children}
    </div>
  );
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
