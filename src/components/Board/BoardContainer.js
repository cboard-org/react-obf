import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ButtonActions } from './constants';
import Board from './Board';
import BoardButton from './BoardButton/BoardButton';
import BackButton from './BackButton/BackButton';

class BoardContainer extends Component {
  static propTypes = {
    /**
     * [`Open Board Format`](http://www.openboardformat.org/docs) compliant board to render
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
          id: PropTypes.string,
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
          id: PropTypes.string,
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
        order: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
      })
    }),
    /**
     * Callback, fired when requesting to load board
     * @param {Object} board
     */
    onBoardLoadRequested: PropTypes.func,
    /**
     * Callback, fired when output changes
     * @param {Array} output
     */
    onOutputChange: PropTypes.func,
    /**
     * Output values
     */
    output: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Image src
         */
        image: PropTypes.string,
        /**
         * Label to display
         */
        label: PropTypes.string,
        /**
         * Overrides `label` property on speech output
         */
        vocalization: PropTypes.string
      })
    ),
    /**
     * Tile renderer
     * @param {Object}
     */
    renderTile: PropTypes.func,
    /**
     * Speak function
     * @param {string} message - Text to speak
     */
    speak: PropTypes.func
  };

  static getDerivedStateFromProps(props, state) {
    const denormalizedButtons = props.board.buttons.map(button => ({
      ...button,
      image: props.board.images.find(image => image.id === button.image_id),
      sound: props.board.sounds.find(sound => sound.id === button.sound_id)
    }));

    const output = props.output || state.output;
    return { ...state, output, buttons: denormalizedButtons };
  }

  state = {
    buttons: [],
    output: []
  };

  getButtonById(id) {
    const button = this.state.buttons.find(button => button.id === id);
    return button;
  }

  outputClear() {
    const output = [];
    this.changeOutput(output);
  }

  outputPop() {
    const output = [...this.state.output];
    output.pop();
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

  changeOutput(output) {
    const { onOutputChange } = this.props;

    if (onOutputChange) {
      onOutputChange(output);
    } else {
      this.setState({ output });
    }
  }

  loadBoard(board) {
    const { onBoardLoadRequested } = this.props;

    if (onBoardLoadRequested) {
      onBoardLoadRequested(board.name);
    }
  }

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

  handleOutputBackspace = () => {
    this.outputPop();
  };

  handleOutputClear = () => {
    this.outputClear();
  };

  handleButtonClick = button => {
    const { onButtonClick } = this.props;

    if (button.load_board) {
      this.loadBoard(button.load_board);
      return;
    }

    if (button.action) {
      this.doAction(button.action);
      return;
    }

    if (button.actions) {
      button.actions.forEach(action => this.doAction(action));
      return;
    }

    const symbol = {
      image: button.image ? button.image.url || button.image.data : '',
      label: button.label,
      vocalization: button.vocalization
    };

    this.outputPush(symbol);

    if (onButtonClick) {
      onButtonClick(button);
    }
  };

  renderButton = button => {
    const { renderTile } = this.props;

    return button.hidden ? null : (
      <BoardButton
        onClick={() => {
          this.handleButtonClick(button);
        }}
      >
        {renderTile(button)}
      </BoardButton>
    );
  };

  render() {
    const { board } = this.props;

    return (
      <Board
        board={{ ...board, buttons: this.state.buttons }}
        navbarStart={<BackButton />}
        output={this.state.output}
        onOutputClearRequested={this.handleOutputClear}
        onOutputBackspaceRequested={this.handleOutputBackspace}
        renderButton={this.renderButton}
      />
    );
  }
}

export default BoardContainer;
