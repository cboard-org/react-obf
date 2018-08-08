# react-obf

>

[![NPM](https://img.shields.io/npm/v/react-obf.svg)](https://www.npmjs.com/package/react-obf)

## Install

```bash
npm install --save react-obf
```

## Usage

```jsx
import React, { Component } from 'react';

import Board, { Tile, Symbol } from 'react-obf';
import obf from './obf-example.json';

class Example extends Component {
  renderTile(button) {
    const { background_color, border_color, label } = button;

    const tileProps = {
      background_color,
      border_color
    };

    return (
      <Tile {...tileProps}>
        <Symbol label={label} />
      </Tile>
    );
  }

  render() {
    return <Board board={obf} renderTile={this.renderTile} />;
  }
}
```

## License

MIT © [shayc](https://github.com/shayc)
