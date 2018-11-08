import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import colorContrast from 'color-contrast';

import Symbol from '../Symbol/Symbol';
import './Tile.css';

const WcagContrastRatio = {
  AAA: 7,
  AA: 4.5
};

function getContrastColor(baseColor) {
  const lightColor = 'rgb(255, 255, 255)';
  const darkColor = 'rgb(0, 0, 0)';

  const contrast = colorContrast(baseColor, darkColor);
  const color = contrast < WcagContrastRatio.AA ? lightColor : darkColor;
  return color;
}

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
   * Image src to display
   */
  image: PropTypes.string,
  /**
   * Label to display
   */
  label: PropTypes.string,
  /**
   * Board to load
   */
  load_board: PropTypes.shape({})
};

const defaultProps = {
  background_color: 'rgb(255, 255, 255)'
};

const Tile = props => {
  const {
    background_color,
    border_color,
    children,
    className: classNameProp,
    id,
    image,
    label,
    load_board,
    sound,
    style: styleProp,
    ...other
  } = props;

  const folder = load_board && 'folder';

  const className = classNames('Tile', classNameProp, {
    'Tile--folder': folder
  });

  const contrastColor = getContrastColor(background_color);

  const style = {
    ...styleProp,
    backgroundColor: background_color,
    borderColor: border_color,
    color: contrastColor
  };

  return (
    <button type="button" className={className} style={style} {...other}>
      <Symbol label={label} src={image} />
      {children}
    </button>
  );
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
