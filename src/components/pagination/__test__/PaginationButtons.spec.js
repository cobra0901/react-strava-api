import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import PaginationButtons from '../PaginationButtons';

describe('The PaginationButtons component', ()=> {
  let props = {
    pageOnClick: ()=> {},
    currentPage: 1
  };

  it('renders 5 pagination buttons', ()=> {
    let wrapper = shallow(<PaginationButtons {...props}/>);
    expect(wrapper.props().children[0].props.value).toEqual('1');
    expect(wrapper.props().children[0].props.style.backgroundColor).toEqual('#ccc');
    expect(wrapper.props().children[1].props.value).toEqual('2');
    expect(wrapper.props().children[2].props.value).toEqual('3');
    expect(wrapper.props().children[3].props.value).toEqual('4');
    expect(wrapper.props().children[4].props.value).toEqual('5');
  });

  it('renders 5 pagination buttons with button 2 highlighted as current', ()=> {
    props.currentPage = 2;
    let wrapper = shallow(<PaginationButtons {...props}/>);
    expect(wrapper.props().children[0].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[1].props.style.backgroundColor).toEqual('#ccc');
    expect(wrapper.props().children[2].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[3].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[4].props.style.backgroundColor).toEqual(undefined);
  });

  it('renders 5 pagination buttons with button 3 highlighted as current', ()=> {
    props.currentPage = 3;
    let wrapper = shallow(<PaginationButtons {...props}/>);
    expect(wrapper.props().children[0].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[1].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[2].props.style.backgroundColor).toEqual('#ccc');
    expect(wrapper.props().children[3].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[4].props.style.backgroundColor).toEqual(undefined);
  });

  it('renders 5 pagination buttons with button 4 highlighted as current', ()=> {
    props.currentPage = 4;
    let wrapper = shallow(<PaginationButtons {...props}/>);
    expect(wrapper.props().children[0].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[1].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[2].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[3].props.style.backgroundColor).toEqual('#ccc');
    expect(wrapper.props().children[4].props.style.backgroundColor).toEqual(undefined);
  });

  it('renders 5 pagination buttons with button 5 highlighted as current', ()=> {
    props.currentPage = 5;
    let wrapper = shallow(<PaginationButtons {...props}/>);
    expect(wrapper.props().children[0].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[1].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[2].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[3].props.style.backgroundColor).toEqual(undefined);
    expect(wrapper.props().children[4].props.style.backgroundColor).toEqual('#ccc');
  });

});