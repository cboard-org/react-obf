Basic Output:

```jsx
let symbols = [{ label: 'I' }, { label: 'Like' }, { label: 'Ice Cream' }];

const props = {
  symbols,
  onBackspaceClick: () => console.log('backspace'),
  onClearClick: () => console.log('clear')
};

<div style={{ height: '300px' }}>
  <Output {...props} />
</div>;
```
