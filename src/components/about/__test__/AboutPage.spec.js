import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import AboutPage from '../AboutPage';

describe('The AboutPage component', ()=> {
  it('renders a header with a paragraph', ()=> {
    let wrapper = shallow(<AboutPage />);
    expect(wrapper.find('h1').text()).toEqual('About');
    expect(wrapper.find('p').text()).toEqual('This app uses React, React Router and Redux along with the Strava API to manipulate and display Strava activty data');
  });
});