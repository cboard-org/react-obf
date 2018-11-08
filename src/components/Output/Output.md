Basic Output:

```jsx
const props = {
  values: [{label: 'hi'} , {label: 'there!'}],
  renderValue: value => value.label
};

<div style={{ height: '200px'}}>
  <Output {...props} />
</div>;
```
