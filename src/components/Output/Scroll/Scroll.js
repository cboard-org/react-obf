import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Scroll.css';

const invertDir = dir => (dir === 'rtl' ? 'ltr' : 'rtl');

class Scroll extends PureComponent {
  static propTypes = {
    /**
     * Text direction
     */
    dir: PropTypes.oneOf(['ltr', 'rtl'])
  };

  static defaultProps = {
    dir: 'ltr'
  };

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  scrollToEnd() {
    const { dir } = this.props;
    const scrollRef = this.scrollRef.current;
    const scrollXEnd = dir === 'ltr' ? scrollRef.scrollWidth - scrollRef.offsetWidth : 0;
    scrollRef.scroll(scrollXEnd, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.children.length !== prevProps.children.length) {
      this.scrollToEnd();
    }
  }

  render() {
    const { children, className, dir, style, tabIndex, ...other } = this.props;

    const scrollClassName = classNames('Scroll', className);
    const scrollStyle = { direction: invertDir(dir) };

    return (
      <div className={scrollClassName} style={scrollStyle} {...other} ref={this.scrollRef}>
        <div className="Scroll__container" style={{ ...style, direction: dir }} tabIndex={tabIndex}>
          {children}
        </div>
      </div>
    );
  }
}

export default Scroll;
