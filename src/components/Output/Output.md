Basic Output:

```jsx
const initialState = {
  values: [
    {label:'speak', src: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/talk.png'},
    {label: 'with everyone', src: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/group of people.png'}
  ]
};

const props = {
  values: state.values,
  renderValue: value => <Symbol {...value} />,
  onChange: values => { setState({values}) }
};

<div style={{ height: '200px'}}>
  <Output {...props} />
</div>;
```
