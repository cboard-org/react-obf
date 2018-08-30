import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Scroll.css';

const invertDir = dir => (dir === 'rtl' ? 'ltr' : 'rtl');

export class Scroll extends PureComponent {
  static propTypes = {
    direction: PropTypes.oneOf(['ltr', 'rtl'])
  };

  static defaultProps = {
    direction: 'ltr'
  };

  render() {
    const { children, className, direction, style, ...other } = this.props;

    const scrollClassName = classNames('Scroll', className);
    const scrollStyle = { direction: invertDir(direction) };

    return (
      <div className={scrollClassName} style={scrollStyle} {...other}>
        <div className="Scroll__container" style={{ ...style, direction }}>
          {children}
        </div>
      </div>
    );
  }
}

export default Scroll;
