# react-obf

>

[![NPM](https://img.shields.io/npm/v/react-obf.svg)](https://www.npmjs.com/package/react-obf)

## Features

- Supports OBF natively
- Full control over [board button rendering](#renderBoardButtonProp)
- Scanning mode
- Grid size
- Grid order
- LTR / RTL direction

## Install

```bash
npm install --save react-obf
```

## Basic Usage

```jsx
import React, { Component } from 'react';
import { Board, BoardButton } from 'react-obf';

import boardSet from './communikate-20.json';

class Example extends Component {
  state = {
    board: boardSet.boards[boardSet.root]
  };

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  loadBoard = board => {
    this.setState({ board: boardSet.boards[board.id] });
  };

  renderBoardButton(boardButton) {
    return <BoardButton {...boardButton} />;
  }

  render() {
    return (
      <Board
        board={this.state.board}
        onLoadBoard={this.loadBoard}
        onSpeak={this.speak}
        renderBoardButton={this.renderBoardButton}
      />
    );
  }
}
```

## Props

| Prop                                      | Type   | Required | Description                                                                                   |
| ----------------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| [`backspaceButton`](#backspaceButtonProp) | Object |          | Component to render output backspace button.                                                  |
| [`board`](#boardProp)                     | Object | ✓        | Board to display, needs to be [Open Board Format](http://www.openboardformat.org/) compliant. |
| [`clearButton`](#clearButtonProp)         | Object |          | Component to render output clear button.                                                      |
| [`dir`](#dirProp)                         | String |          | Board direction, one of: `ltr`, `rtl`.                                                        |
| [`navbar`](#navbarPropProp)               | Object |          | Component to render navigation bar.                                                           |

| [`onLoadBoard`](#onLoadBoardProp) | Function | | Callback, fired when requesting to load board. |
| [`onOutputChange`](#onOutputChangeProp) | Function | | Callback, fired when output changes. |
| [`onPlaySound`](#onPlaySoundProp) | Function | | Callback, fired when requesting to play sound. |
| [`onSpeak`](#onSpeakProp) | Function | | Callback, fired when requesting to speak. |
| [`output`](#outputProp) | Array | | Output to display. |
| [`outputHidden`](#outputHiddenProp) | Boolean | | When `true`, output is hidden. |
| [`renderBoardButton`](#renderBoardButtonProp) | Function | ✓ | Board button renderer |
| [`scanInterval`](#scanIntervalProp) | Number | | Sets the scan rate interval when `scanning` is `true`. |
| [`scanning`](#scanningProp) | Boolean | | When `true`, scanner is activated. |
| [`size`](#sizeProp) | String | | UI size. |
| [`toolbarProp`](#toolbarPropProp) | Object | | Component to render toolbar. |

<a name="backspaceButtonProp"></a>

#### backspaceButton (optional)

<a name="boardProp"></a>

#### board (required)

<a name="clearButtonProp"></a>

#### clearButton (optional)

<a name="dirProp"></a>

#### dir (optional)

<a name="navbarProp"></a>

#### navbar (optional)

<a name="onLoadBoardProp"></a>

#### onLoadBoard (optional)

<a name="onOutputChangeProp"></a>

#### onOutputChange (optional)

<a name="onPlaySoundProp"></a>

#### onPlaySound (optional)

<a name="onSpeakProp"></a>

#### onSpeak (optional)

<a name="outputProp"></a>

#### output (optional)

<a name="renderBoardButtonProp"></a>

#### renderBoardButton (required)

<a name="scanIntervalProp"></a>

#### scanInterval (optional)

<a name="scanningProp"></a>

#### scanning (optional)

<a name="sizeProp"></a>

#### size (optional)

<a name="toolbarProp"></a>

#### toolbar (optional)

## License

MIT
