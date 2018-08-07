Basic Board:

```jsx
const board = require('../../data/obf-example.json');

function renderTile(button) {
  const { background_color, border_color, image, label } = button;

  const tileProps = {
    background_color,
    border_color,
    variant: button.load_board ? 'folder' : 'button'
  };

  return (
    <Tile {...tileProps}>
      <Symbol label={label} image={image ? image.url || image.data : ''} />
    </Tile>
  );
}

const props = {
  board,
  renderButton: renderTile
};

<div style={{ height: '500px' }}>
  <BoardContainer {...props} />
</div>;
```
