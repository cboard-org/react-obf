Basic Board:

```jsx
const boardSet = require('../../data/communikate-20.json');
const rootBoard = boardSet.boards[boardSet.root];
const initialState = { board: rootBoard, scanning: false };

const renderBoardButton = boardButton => <BoardButton {...boardButton} />;

const loadBoard = board => {
  setState({ board: boardSet.boards[board.id] });
};

const speak = text => {
  const utterThis = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterThis);
};

<div style={{ height: '600px' }}>
  {!state.scanning ? (
    <button
      style={{ position: 'absolute', zIndex: 1 }}
      type="button"
      onClick={() => {
        setState({ scanning: true });
      }}
    >
      Scan
    </button>
  ) : null}

  <Board
    board={state.board}
    onLoadBoard={loadBoard}
    onSpeak={speak}
    renderBoardButton={renderBoardButton}
    scanning={state.scanning}
  />
</div>;
```
