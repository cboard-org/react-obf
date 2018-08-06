import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ButtonActions } from './constants';
import Board from './Board';
import BoardButton from './BoardButton/BoardButton';

class BoardContainer extends Component {
  static propTypes = {
    renderButton: PropTypes.func
  };

  static defaultProps = {
    onBoardLoadRequested: () => {}
  };

  static getDerivedStateFromProps(props, state) {
    const denormalizedButtons = props.board.buttons.map(button => ({
      ...button,
      image: props.board.images.find(image => image.id === button.image_id),
      sound: props.board.sounds.find(sound => sound.id === button.sound_id)
    }));

    return { ...state, buttons: denormalizedButtons };
  }

  state = {
    buttons: [],
    output: []
  };

  outputClear() {
    const output = [];
    this.setState(state => ({ output }));
  }

  outputPop() {
    this.setState(state => {
      let output = [...state.output];
      output.pop();
      return { output };
    });
  }

  outputPush(symbol) {
    this.setState(state => ({
      output: [...state.output, symbol]
    }));
  }

  loadBoard(board) {
    const { onBoardLoadRequested } = this.props;
    onBoardLoadRequested(board.name);
  }

  doAction(action) {
    switch (action) {
      case ButtonActions.clear:
        this.outputClear();
        break;
      default:
      // no default
    }
  }

  handleOutputBackspace = () => {
    const { onOutputChange } = this.props;
    this.outputPop();
  };

  handleOutputClear = () => {
    const { onOutputChange } = this.props;
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
  };

  renderButton = button => {
    const { renderButton } = this.props;

    return (
      <BoardButton
        onClick={() => {
          this.handleButtonClick(button);
        }}
      >
        {renderButton(button)}
      </BoardButton>
    );
  };

  render() {
    const { board, renderButton } = this.props;

    return (
      <Board
        board={{ ...board, buttons: this.state.buttons }}
        output={this.state.output}
        onOutputClearRequested={this.handleOutputClear}
        onOutputBackspaceRequested={this.handleOutputBackspace}
        renderButton={this.renderButton}
      />
    );
  }
}

export default BoardContainer;
