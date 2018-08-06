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
   *
   */
  icon: PropTypes.node,
  /**
   * Type of tile
   */
  variant: PropTypes.oneOf(['button', 'folder'])
};

const defaultProps = {};

const Tile = props => {
  const { background_color, border_color, children, className, icon, variant, ...other } = props;

  const tileClassName = classNames('Tile', className);

  const folder = variant === 'folder';
  const tileShapeClassName = classNames('TileShape', {
    'TileShape--folder': folder
  });

  const tileShapeStyles = {};

  if (border_color) {
    tileShapeStyles.borderColor = border_color;
  }

  if (background_color) {
    tileShapeStyles.backgroundColor = background_color;
  }

  return (
    <div className={tileClassName} {...other}>
      <div className={tileShapeClassName} style={tileShapeStyles} />
      {icon && <div className="Tile__icon-placeholder">{<icon />}</div>}
      {children}
    </div>
  );
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
