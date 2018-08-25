import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import { Link, IndexLink } from 'react-router';
import Header from '../Header';

describe('The Header component', ()=> {
  it('renders react router IndexLink with href', () => {
    let wrapper = shallow(<Header/>);
    expect(wrapper.find(IndexLink).props().to).toEqual('/');
  });

  it('renders react router Links with href', () => {
    let wrapper = shallow(<Header/>);
    expect(wrapper.find(Link).getElements()[0].props.to).toEqual('/activities');
    expect(wrapper.find(Link).getElements()[1].props.to).toEqual('/races');
    expect(wrapper.find(Link).getElements()[2].props.to).toEqual('/about');
  });
});