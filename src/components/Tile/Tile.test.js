import React from 'react';
import { shallow, mount } from 'enzyme';

import Symbol from '../Symbol/Symbol';
import BoardButton from './BoardButton';

it('renders without crashing', () => {
  shallow(<BoardButton />);
});

it('renders with <Symbol /> child', () => {
  const wrapper = shallow(<BoardButton />);
  expect(wrapper.contains(<Symbol />)).toEqual(true);
});

it('renders with <Symbol /> child and props', () => {
  const props = {
    label: 'dummy label',
    img: 'path/to/img.svg'
  };
  const wrapper = shallow(<BoardButton {...props} />);
  expect(wrapper.contains(<Symbol {...props} />)).toEqual(true);
});

it('renders with a folder className', () => {
  const folderClassName = 'BoardButton--folder';
  const props = {
    loadBoard: 'boardId'
  };
  const wrapper = shallow(<BoardButton {...props} />);
  expect(wrapper.hasClass(folderClassName)).toEqual(true);
});

it('set ref element', () => {
  const wrapper = mount(<BoardButton />);
  const instance = wrapper.instance();
  expect(instance.boardButtonElement).toBeTruthy();
});

it('on tile focus', () => {
  const props = {
    id: '42',
    onFocus: jest.fn()
  };
  const wrapper = shallow(<BoardButton {...props} />);
  wrapper.simulate('focus');
  expect(props.onFocus.mock.calls[0][0]).toEqual(props.id);
});

it('on tile click', () => {
  const props = {
    id: '42',
    onClick: jest.fn()
  };
  const wrapper = shallow(<BoardButton {...props} />);
  wrapper.simulate('click');
  expect(props.onClick.mock.calls.length).toEqual(1);
  expect(props.onClick.mock.calls[0][0].id).toEqual(props.id);
});
