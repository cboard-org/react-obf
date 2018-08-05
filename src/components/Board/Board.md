Basic Board:

```jsx
const board = require('../../obf-example.json');

function renderTile(button) {
  const { background_color, border_color } = button;

  const tileProps = {
    background_color,
    border_color
  };

  return (
    <Tile {...tileProps}>
      <Symbol label={button.label} />
    </Tile>
  );
}

const props = {
  board,
  renderTile
};

<div style={{ height: '300px' }}>
  <Board {...props} />
</div>;
```
