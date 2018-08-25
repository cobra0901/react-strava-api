import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import { Link } from 'react-router';
import HomePage from '../HomePage';

describe('The HomePage component', ()=> {
  it('renders a paragraph with text', () => {
    let wrapper = shallow(<HomePage/>);
    expect(wrapper.find('p').text()).toEqual('React and Strava API playground');
  });

  it('renders a react router Link with href', () => {
    let wrapper = shallow(<HomePage/>);
    expect(wrapper.find(Link).props().to).toEqual('about');
  });
});