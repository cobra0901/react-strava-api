import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import ActivitiesListRow from '../ActivitiesListRow';
import {Link} from 'react-router';

describe('The ActivitiesListRow component', ()=> {
  let props = {
    activity: {
      id: 1,
      name: 'parkrun1',
      distance: 5240.6
    }
  };

  it('renders the Activity Name and Distance', ()=> {
    let wrapper = shallow(<ActivitiesListRow {...props}/>);
    expect(wrapper.find(Link).props().children).toBe('parkrun1');
    expect(wrapper.find('#activityDistance').text()).toEqual("3.26");
  });

  it('renders the Link to route', ()=> {
    let wrapper = shallow(<ActivitiesListRow {...props}/>);
    expect(wrapper.find(Link).props().to).toBe('activities/1');
  });
});