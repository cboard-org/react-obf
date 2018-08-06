import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Symbol from '../Symbol/Symbol';
import BackspaceButton from './BackspaceButton/BackspaceButton';
import ClearButton from './ClearButton/ClearButton';
import Scroll from './Scroll/Scroll';
import './Output.css';

class Output extends PureComponent {
  static propTypes = {
    /**
     *
     */
    onBackspaceClick: PropTypes.func,
    /**
     *
     */
    onClearClick: PropTypes.func,
    /**
     * Symbols to output
     */
    symbols: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Image to display
         */
        image: PropTypes.string,
        /**
         * Label to display
         */
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      })
    )
  };

  static defaultProps = {
    symbols: []
  };

  render() {
    const { onBackspaceClick, onClearClick, symbols, ...other } = this.props;

    const clearButtonStyle = {
      visibility: symbols.length ? 'visible' : 'hidden'
    };

    return (
      <div className="Output">
        <Scroll {...other}>
          {symbols.map(({ image, label }, index) => (
            <div className="Output__value" key={index}>
              <Symbol image={image} label={label} />
            </div>
          ))}
        </Scroll>

        <ClearButton onClick={onClearClick} style={clearButtonStyle} />
        <BackspaceButton onClick={onBackspaceClick} />
      </div>
    );
  }
}

export default Output;
