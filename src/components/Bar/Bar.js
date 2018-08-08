import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Bar.css';

export class Bar extends Component {
  static propTypes = {
    /**
     * Component to render
     */
    as: PropTypes.node,
    /**
     * Direction to render
     */
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    /**
     * Group start component(s)
     */
    groupStart: PropTypes.node,
    /**
     * Group middle component(s)
     */
    groupMiddle: PropTypes.node,
    /**
     * Group end component(s)
     */
    groupEnd: PropTypes.node
  };

  static defaultProps = {
    as: 'div',
    direction: 'horizontal'
  };

  render() {
    const { as: T, className, direction, groupStart, groupMiddle, groupEnd, ...other } = this.props;

    const vertical = direction === 'vertical';

    const barClassName = classNames('Bar', className, {
      'Bar--vertical': vertical
    });

    return (
      <T className={barClassName} {...other}>
        <div className="Bar__group--start">{groupStart}</div>
        <div className="Bar__group--middle">{groupMiddle}</div>
        <div className="Bar__group--end">{groupEnd}</div>
      </T>
    );
  }
}

export default Bar;
