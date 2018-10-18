import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SizeMe } from 'react-sizeme';

import Symbol from '../Symbol/Symbol';
import Bar from '../Bar/Bar';
import Grid from '../Grid/Grid';
import Output from '../Output/Output';

import { ButtonActions } from './constants';
import BoardLayout from './BoardLayout';
import { Scannable, Scanner } from 'react-scannable';

const getImageSrc = image => (image ? image.data || /* image.path || */ image.url : '');
const getSoundSrc = sound => (sound ? sound.data || sound.path || sound.url : '');

const getLocaleMessage = (board, message) => {
  const { locale, strings } = board;
  const localeMessage = strings && strings[locale] && strings[locale][message];
  return localeMessage || message;
};

const denormalizeBoardButtons = board =>
  board.buttons.map(({ image_id, label, sound_id, vocalization, ...other }) => ({
    ...other,
    image: getImageSrc(board.images.find(image => image.id === image_id)),
    label: getLocaleMessage(board, label),
    sound: getSoundSrc(board.sounds.find(sound => sound.id === sound_id)),
    vocalization: getLocaleMessage(board, vocalization)
  }));

/**
 * Board component, render OBF compliant objects
 */
class Board extends Component {
  static propTypes = {
    /**
     * Component to render backspace button.
     */
    backspaceButton: PropTypes.node,
    /**
     * Board to display, needs to be [Open Board Format](http://www.openboardformat.org/) compliant.
     */
    board: PropTypes.shape({
      /**
       * ID
       */
      id: PropTypes.string,
      /**
       * Locale
       */
      locale: PropTypes.string,
      /**
       * Name
       */
      name: PropTypes.string,
      /**
       * Buttons
       */
      buttons: PropTypes.arrayOf(
        PropTypes.shape({
          action: PropTypes.string,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string,
          vocalization: PropTypes.string,
          image_id: PropTypes.string,
          sound_id: PropTypes.string,
          background_color: PropTypes.string,
          border_color: PropTypes.string,
          load_board: PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            data_url: PropTypes.string
          }),
          hidden: PropTypes.bool
        })
      ),
      /**
       * Images
       */
      images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          width: PropTypes.number,
          height: PropTypes.number,
          data: PropTypes.string,
          'content-type': PropTypes.string,
          url: PropTypes.string,
          source_url: PropTypes.string,
          author_name: PropTypes.string,
          author_url: PropTypes.string
        })
      ),
      /**
       * Sounds
       */
      sounds: PropTypes.arrayOf(PropTypes.shape({})),
      /**
       * Grid
       */
      grid: PropTypes.shape({
        /**
         * Number of rows
         */
        rows: PropTypes.number,
        /**
         * Number of columns
         */
        columns: PropTypes.number,
        /**
         * Buttons order
         */
        order: PropTypes.arrayOf(
          PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        )
      })
    }),
    /**
     * Component to render clear button.
     */
    clearButton: PropTypes.node,
    /**
     * Text direction
     */
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    /**
     * Component to render in navbar start region.
     */
    navbarStart: PropTypes.node,
    /**
     * Component to render in navbar end region.
     */
    navbarEnd: PropTypes.node,
    /**
     * Callback, fired when requesting to load board.
     * @param {Object} board
     */
    onLoadBoard: PropTypes.func,
    /**
     * Callback, fired when output changes.
     * @param {Array} output
     */
    onOutputChange: PropTypes.func,
    /**
     * Callback, fired when requesting to play sound.
     * @param {Object} sound - Sound to play.
     */
    onPlaySound: PropTypes.func,
    /**
     * Callback, fired when requesting to speak.
     * @param {string} text - Text to speak.
     */
    onSpeak: PropTypes.func,
    /**
     * Output to display.
     */
    output: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Image src to display.
         */
        image: PropTypes.string,
        /**
         * Label to display.
         */
        label: PropTypes.string,
        /**
         * Sound to play.
         */
        sound: PropTypes.string,
        /**
         * Overrides `label` property in speech output.
         */
        vocalization: PropTypes.string
      })
    ),
    /**
     * If true, output is hidden
     */
    outputHidden: PropTypes.bool,
    /**
     * Board button renderer
     * @param {Object}
     */
    renderBoardButton: PropTypes.func,
    /**
     * Sets the scan rate interval when `scanning` is `true`.
     */
    scanInterval: PropTypes.number,
    /**
     * When `true`, scanner is activated.
     */
    scanning: PropTypes.bool,
    /**
     * UI size.
     */
    size: PropTypes.oneOf(['default', 'large', 'larger']),
    /**
     * Component to render toolbar.
     */
    toolbarComponent: PropTypes.node
  };

  static defaultProps = {
    dir: 'ltr',
    scanInterval: 1500,
    size: 'default'
  };

  static getDerivedStateFromProps(props, state) {
    // TODO optimize getDerivedStateFromProps
    const buttons = denormalizeBoardButtons(props.board);
    const output = props.output || state.output;
    return { ...state, buttons, output };
  }

  state = {
    buttons: [],
    output: []
  };

  outputClear() {
    const output = [];
    this.changeOutput(output);
  }

  outputPush(symbol) {
    const output = [...this.state.output, symbol];
    this.changeOutput(output);
  }

  outputJoinLabel(label) {
    if (this.state.output.length === 0) {
      return;
    }

    const output = [...this.state.output];
    const lastSymbol = output[output.length - 1];
    lastSymbol.label = `${lastSymbol.label}${label}`;

    this.changeOutput(output);
  }

  changeOutput = output => {
    const { onOutputChange } = this.props;

    if (onOutputChange) {
      onOutputChange(output);
    } else {
      this.setState({ output });
    }
  };

  doAction(action) {
    switch (action) {
      case ButtonActions.clear:
        this.outputClear();
        break;
      default:
      // no default
    }

    if (action.startsWith('+')) {
      const label = action.slice(1);
      this.outputJoinLabel(label);
    }
  }

  reduceOutput() {
    return this.state.output.reduce((previousText, currentValue) => {
      const currentText = currentValue.vocalization || currentValue.label;
      return `${previousText} ${currentText}`;
    }, '');
  }

  handleBoardButtonClick = button => {
    const { onLoadBoard, onBoardButtonClick, onPlaySound, onSpeak } = this.props;

    if (button.vocalization) {
      onSpeak && onSpeak(button.vocalization);
    }

    if (button.actions && button.actions.length) {
      button.actions.forEach(action => this.doAction(action));
      return;
    } else if (button.action) {
      this.doAction(button.action);
      return;
    }

    if (button.load_board) {
      onLoadBoard && onLoadBoard(button.load_board);
      return;
    }

    if (button.sound) {
      onPlaySound && onPlaySound(button.sound);
    } else if (button.label) {
      onSpeak && onSpeak(button.label);
    }

    const symbol = {
      label: button.label,
      sound: button.sound,
      image: button.image,
      vocalization: button.vocalization
    };
    this.outputPush(symbol);

    onBoardButtonClick && onBoardButtonClick(button);
  };

  handleOutputClick = () => {
    const { onSpeak } = this.props;
    const text = this.reduceOutput();
    onSpeak && onSpeak(text);
  };

  renderBoardButton = button => {
    const { renderBoardButton } = this.props;

    return button.hidden ? null : (
      <Scannable>
        {React.cloneElement(renderBoardButton(button), {
          onClick: () => {
            this.handleBoardButtonClick(button);
          }
        })}
      </Scannable>
    );
  };

  renderSymbol = ({ label, image }) => <Symbol label={label} src={image} />;

  renderOutput = () => {
    const { backspaceButton, clearButton, dir } = this.props;

    return (
      <Scannable disabled={!this.state.output.length}>
        <Output
          backspaceButton={backspaceButton}
          clearButton={clearButton}
          dir={dir}
          interactiveWrapper={Scannable}
          onChange={this.changeOutput}
          onClick={this.handleOutputClick}
          renderValue={this.renderSymbol}
          values={this.state.output}
        />
      </Scannable>
    );
  };

  renderNavbar = () => {
    const { board, navbarStart, navbarEnd } = this.props;

    return (
      <Bar
        groupStart={navbarStart}
        groupMiddle={<div className="Board__name">{board.name}</div>}
        groupEnd={navbarEnd}
      />
    );
  };

  renderGrid = () => {
    const {
      board: { grid }
    } = this.props;

    return (
      <SizeMe monitorHeight>
        {({ size }) => (
          <Scannable>
            <Grid
              columns={grid.columns}
              items={this.state.buttons}
              order={grid.order}
              renderItem={this.renderBoardButton}
              rows={grid.rows}
              rowWrapper={Scannable}
              size={size}
            />
          </Scannable>
        )}
      </SizeMe>
    );
  };

  render() {
    const { dir, scanInterval, scanning, size, toolbar } = this.props;

    const output = this.renderOutput();
    const navbar = this.renderNavbar();
    const grid = this.renderGrid();

    return (
      <Scanner active={scanning} iterationInterval={scanInterval}>
        <BoardLayout
          dir={dir}
          size={size}
          outputComponent={output}
          navbarComponent={navbar}
          toolbarComponent={toolbar}
          gridComponent={grid}
        />
      </Scanner>
    );
  }
}

export default Board;
