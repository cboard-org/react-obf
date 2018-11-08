import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BackspaceButton from './BackspaceButton/BackspaceButton';
import ClearButton from './ClearButton/ClearButton';
import Scroll from './Scroll/Scroll';
import './Output.css';

const KeyCodes = {
  enter: 13,
  space: 32
};

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
     * Text direction
     */
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    /**
     * Callback, fired when output changes
     */
    onChange: PropTypes.func,
    /**
     * Callback, fired when output is clicked
     */
    onClick: PropTypes.func,
    /**
     * Render value
     */
    renderValue: PropTypes.func.isRequired,
    /**
     *
     */
    interactiveWrapper: PropTypes.func,
    /**
     * Value to output
     */
    values: PropTypes.array
  };

  static defaultProps = {
    interactiveWrapper: props => props.children,
    values: []
  };

  outputClear() {
    const { onChange } = this.props;
    const output = [];
    onChange(output);
  }

  outputPop() {
    const { onChange, values } = this.props;
    const output = [...values];
    output.pop();
    onChange(output);
  }

  handleBackspace = event => {
    this.outputPop();
  };

  handleClear = event => {
    this.outputClear();
  };

  handleKeyDown = event => {
    if (event.keyCode === KeyCodes.space) {
      event.preventDefault();
    }
  };

  handleKeyUp = event => {
    const { onClick } = this.props;

    switch (event.keyCode) {
      // fall through
      case KeyCodes.enter:
      case KeyCodes.space:
        onClick && onClick();
        break;
      default:
      // no default
    }
  };

  renderClearButton() {
    const { clearButton, values } = this.props;

    const disabled = !values.length;

    const style = {
      visibility: disabled ? 'hidden' : 'visible'
    };

    const props = {
      disabled,
      style,
      onClick: this.handleClear
    };

    return clearButton ? React.cloneElement(clearButton, props) : <ClearButton {...props} />;
  }

  renderBackspaceButton() {
    const { backspaceButton } = this.props;

    const props = {
      onClick: this.handleBackspace
    };

    return backspaceButton ? (
      React.cloneElement(backspaceButton, props)
    ) : (
      <BackspaceButton {...props} />
    );
  }

  render() {
    const {
      className,
      dir,
      interactiveWrapper: InteractiveWrapper,
      onClick,
      renderValue,
      values
    } = this.props;

    const outputClassName = classNames('Output', className);

    const tabIndex = values.length ? '0' : '-1';

    return (
      <div className={outputClassName}>
        <InteractiveWrapper>
          <Scroll
            dir={dir}
            onClick={onClick}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            tabIndex={tabIndex}
          >
            {values.map((value, index) => (
              <div className="Output__value" key={index}>
                {renderValue(value)}
              </div>
            ))}
          </Scroll>
        </InteractiveWrapper>
        <div className="Output__button">
          <InteractiveWrapper>{this.renderClearButton()}</InteractiveWrapper>
        </div>
        <div className="Output__button">
          <InteractiveWrapper>{this.renderBackspaceButton()}</InteractiveWrapper>
        </div>
      </div>
    );
  }
}

export default Output;
