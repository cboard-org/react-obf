import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Symbol from '../Symbol/Symbol';
import Scroll from './Scroll/Scroll';
import './Output.css';

class Output extends PureComponent {
  static propTypes = {
    /**
     * Backspace button component
     */
    backspaceButton: PropTypes.node,
    /**
     * Clear button component
     */
    clearButton: PropTypes.node,
    /**
     * Direction
     */
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    /**
     * Callback fired on output clear / backspace
     */
    onChange: PropTypes.func,
    /**
     * Symbols to output
     */
    symbols: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Image src to display
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
    scrollWrapper: props => props.children,
    symbols: []
  };

  outputClear() {
    const { onChange } = this.props;
    const output = [];
    onChange(output);
  }

  outputPop() {
    const { onChange, symbols } = this.props;
    const output = [...symbols];
    output.pop();
    onChange(output);
  }

  handleBackspace = event => {
    this.outputPop();
  };

  handleClear = event => {
    this.outputClear();
  };

  renderClearButton() {
    const { clearButton, symbols } = this.props;

    const disabled = !symbols.length;

    const style = {
      visibility: disabled ? 'hidden' : 'visible'
    };

    return clearButton
      ? React.cloneElement(clearButton, {
          disabled,
          style,
          onClick: this.handleClear
        })
      : null;
  }

  renderBackspaceButton() {
    const { backspaceButton } = this.props;

    return backspaceButton
      ? React.cloneElement(backspaceButton, {
          onClick: this.handleBackspace
        })
      : null;
  }

  render() {
    const { className, dir, onClick, scrollWrapper: ScrollWrapper, symbols } = this.props;

    const outputClassName = classNames('Output', className);

    return (
      <div className={outputClassName}>
        <ScrollWrapper>
          <Scroll onClick={onClick} dir={dir}>
            {symbols.map(({ image, label }, index) => (
              <div className="Output__value" key={index}>
                <Symbol label={label} src={image} />
              </div>
            ))}
          </Scroll>
        </ScrollWrapper>
        <div className="Output__button">{this.renderClearButton()}</div>
        <div className="Output__button">{this.renderBackspaceButton()}</div>
      </div>
    );
  }
}

export default Output;
