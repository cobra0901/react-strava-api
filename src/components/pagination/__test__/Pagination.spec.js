import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import Pagination from '../Pagination';
import PaginationButtons from '../PaginationButtons';

describe('The Pagination component', ()=> {
  let props = {
    pageLeftonClick: ()=> {},
    pageRightonClick: ()=> {},
    pageOnClick: ()=> {},
    currentPage: 1
  };

  it('renders the PaginationButtons component', ()=> {
    let wrapper = shallow(<Pagination {...props}/>);
    expect(wrapper.find(PaginationButtons).length).toEqual(1);
  });
});