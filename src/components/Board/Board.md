Basic Board:

```jsx
const { readOBFFile, readOBZFile } = require('./obf-utils.js');
const boardSet = require('../../data/communikate-20.json');

const rootBoard = boardSet.boards[boardSet.root];

const initialState = {
  boardSet,
  board: rootBoard,
  scanning: false
};

const renderButton = button => <Tile {...button} />;

const loadBoard = loadBoard => {
  const board = state.boardSet.boards[loadBoard.path] || state.boardSet.boards[loadBoard.id];
  setState({ board });
};

const speak = text => {
  const utterThis = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterThis);
};

const handleFileUpload = event => {
  const file = event.target.files[0];
  const fileExtension = file.name.split('.')[1];

  switch (fileExtension) {
    case 'obf':
      readOBFFile(file).then(board => {
        setState({ board });
      });
      break;
    case 'obz':
      readOBZFile(file).then(boardSet => {
        const board = boardSet.boards[boardSet.root];
        setState({ board, boardSet });
      });
      break;
    default:
    // no default
  }
};

<div style={{ height: '600px' }}>
  <div style={{ position: 'absolute', zIndex: 1 }}>
    {!state.scanning ? (
      <button
        type="button"
        onClick={() => {
          setState({ scanning: true });
        }}
      >
        Scan
      </button>
    ) : null}
    <input type="file" onChange={handleFileUpload} accept=".obf, .obz" />
  </div>

  <Board
    board={state.board}
    dir="ltr"
    onLoadBoard={loadBoard}
    onSpeak={speak}
    renderButton={renderButton}
    scanning={state.scanning}
  />
</div>;
```
