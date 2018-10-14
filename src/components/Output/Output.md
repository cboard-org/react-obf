Basic BoardButton:

```jsx
const props = {
  values: [{ label: 'hi' }, { label: 'guys' }],
  onClick: () => {
    alert('Output clicked!');
  },
  renderValue: value => <div>{value.label}</div>
};

<div style={{ height: '200px' }}>
  <Output {...props} />
</div>;
```
