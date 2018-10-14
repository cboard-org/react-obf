import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './BoardLayout.css';

const FontSizes = {
  default: '16px',
  large: '20px',
  larger: '24px'
};

/**
 * BoardLayout component, renders OBF compatible boards
 */
class BoardLayout extends PureComponent {
  static propTypes = {
    /**
     * Text direction
     */
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    gridComponent: PropTypes.node,
    navbarComponent: PropTypes.node,
    outputComponent: PropTypes.node,
    size: PropTypes.oneOf(['default', 'large', 'larger'])
  };

  getFontSize(size) {
    return FontSizes[size] || FontSizes.default;
  }

  render() {
    const { dir, gridComponent, navbarComponent, outputComponent, size } = this.props;

    const boardStyle = { fontSize: this.getFontSize(size) };

    return (
      <div className="Board" dir={dir} style={boardStyle}>
        <div className="Board__output">{outputComponent}</div>
        <div className="Board__main">
          <div className="Board__navbar">{navbarComponent}</div>
          <div className="Board__grid">{gridComponent}</div>
        </div>
      </div>
    );
  }
}

export default BoardLayout;
