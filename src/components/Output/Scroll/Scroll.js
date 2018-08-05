import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Scroll.css';

const invertDir = dir => (dir === 'rtl' ? 'ltr' : 'rtl');

export class Scroll extends PureComponent {
  static propTypes = {};

  static defaultProps = {
    direction: 'ltr'
  };

  render() {
    const { children, direction, style, ...other } = this.props;

    const scrollStyle = { direction: invertDir(direction) };

    return (
      <div className="Scroll" style={scrollStyle}>
        <div className="Scroll__container" style={{ ...style, direction }} {...other}>
          {children}
        </div>
      </div>
    );
  }
}

export default Scroll;
