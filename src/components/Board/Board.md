Basic Board:

```jsx
const JSZip = require('jszip');

const boardSet = require('../../data/communikate-20.json');
const rootBoard = boardSet.boards[boardSet.root];
const initialState = { boardSet, board: rootBoard, scanning: false };

const renderBoardButton = boardButton => <BoardButton {...boardButton} />;

const loadBoard = loadBoard => {
  const board = state.boardSet.boards[loadBoard.path] || state.boardSet.boards[loadBoard.id];
  setState({ board });
};

const speak = text => {
  const utterThis = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterThis);
};

const parseOBZ = zip => {
  return new Promise((resolve, reject) => {
    const boardSet = {
      boards: {},
      root: ''
    };

    let count = 0;

    zip.forEach((relativePath, zipEntry) => {
      count++;

      zip
        .file(relativePath)
        .async('string')
        .then(data => {
          if (relativePath.includes('obf')) {
            const parsedData = JSON.parse(data);
            boardSet.boards[relativePath] = parsedData;
          }

          if (relativePath.includes('manifest')) {
            const parsedData = JSON.parse(data);
            boardSet.root = parsedData.root;
          }

          if (!--count) {
            resolve(boardSet);
          }
        });
    });
  });
};

const readOBZ = file => {
  const reader = new FileReader();

  reader.onload = event => {
    var base64result = event.target.result.split(',')[1];

    JSZip.loadAsync(file, { base64: true })
      .then(parseOBZ)
      .then(boardSet => {
        const board = boardSet.boards[boardSet.root];
        setState({ board, boardSet: boardSet });
      });
  };

  reader.readAsDataURL(file);
};

const readOBF = file => {
  const reader = new FileReader();

  reader.onload = event => {
    const board = JSON.parse(event.target.result);
    setState({ board });
  };

  reader.readAsText(file);
};

const handleFile = event => {
  const file = event.target.files[0];
  const fileExtension = file.name.split('.')[1];

  switch (fileExtension) {
    case 'obf':
      readOBF(file);
      break;
    case 'obz':
      readOBZ(file);
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
    <input type="file" onChange={handleFile} accept=".obf, .obz" />
  </div>
  <Board
    board={state.board}
    onLoadBoard={loadBoard}
    onSpeak={speak}
    renderBoardButton={renderBoardButton}
    scanning={state.scanning}
  />
</div>;
```
