Basic Grid:

```jsx
const props = {
  items: [1, 2, 3, 4],
  renderItem: item => `Item ${item}`
};

<div style={{ height: '300px' }}>
  <Grid {...props} />
</div>;
```
