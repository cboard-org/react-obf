Basic Grid:

```jsx
const props = {
  order: [[4, 3], [], [null, 2, 1]],
  items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  renderItem: item => `Item ${item.id}`
};

<div style={{ height: '300px' }}>
  <Grid {...props} />
</div>;
```
