Basic Tile:

```jsx
const props = {
  background_color: 'gray',
  border_color: 'red',
  image: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/hello_1.png',
  label: 'Hello'
};

<div style={{ height: '200px', width: '200px' }}>
  <Tile {...props} />
</div>;
```
