Basic BoardContainer:

```jsx
const board = require('../../data/obf-example.json');

function renderTile(button) {
  const { background_color, border_color, image, label } = button;

  const tileProps = {
    background_color,
    border_color,
    type: button.load_board && 'folder'
  };

  return (
    <Tile {...tileProps}>
      <Symbol label={label} image={image ? image.url || image.data : ''} />
    </Tile>
  );
}

const speech = {};

const props = {
  board,
  renderTile,
  speech,
  onBoardLoadRequested: board => {
    console.log('load board:', board);
  }
};

<div style={{ height: '500px' }}>
  <BoardContainer {...props} />
</div>;
```
