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
    grid: PropTypes.node,
    navbar: PropTypes.node,
    output: PropTypes.node,
    size: PropTypes.oneOf(['default', 'large', 'larger']),
    toolbar: PropTypes.node
  };

  getFontSize(size) {
    return FontSizes[size] || FontSizes.default;
  }

  render() {
    const { dir, grid, navbar, output, size, toolbar } = this.props;

    const boardStyle = { fontSize: this.getFontSize(size) };

    return (
      <div className="Board" dir={dir} style={boardStyle}>
        {output && <div className="Board__output">{output}</div>}
        <div className="Board__main">
          <div className="Board__navbar">{navbar}</div>
          {toolbar && <div className="Board__toolbar">{toolbar}</div>}
          <div className="Board__buttons">{grid}</div>
        </div>
      </div>
    );
  }
}

export default BoardLayout;
