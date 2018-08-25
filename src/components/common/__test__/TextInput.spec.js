import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import TextInput from '../TextInput';

describe('The TextInput component', ()=> {
  let props;

  props = {
    id: "text_id",
    name: 'text_name',
    label: 'Text Label',
    value: 'Text Value',
    onChange: () => {}
  };

  it('renders a label', () => {
    let wrapper = shallow(<TextInput {...props}/>);
    expect(wrapper.getElements()[0].props.children[0].props.children).toEqual('Text Label');
  });

  it('renders a text input', () => {
    let wrapper = shallow(<TextInput {...props}/>);
    expect(wrapper.getElements()[0].props.children[1].props.children.props.type).toEqual('text');
    expect(wrapper.getElements()[0].props.children[1].props.children.props.className).toEqual('form-control');
    expect(wrapper.getElements()[0].props.children[1].props.children.props.id).toEqual('text_id');
    expect(wrapper.getElements()[0].props.children[1].props.children.props.name).toEqual('text_name');
  });
});