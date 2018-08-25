import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import ActivitiesList from '../ActivitiesList';
import ActivitiesListRow from '../ActivitiesListRow';

describe('The ActivitiesList component', ()=> {
  let props = {
    currentResultsSet: [
        {
          id: 1,
          name: 'parkrun1'
        },
        {
          id: 2,
          name: 'parkrun2'
        },
        {
          id: 3,
          name: 'parkrun3'
        },
        {
          id: 4,
          name: 'parkrun4'
        }
    ]
  };

  it('renders the ActivitListRow component', ()=> {
    let wrapper = shallow(<ActivitiesList {...props}/>);
    expect(wrapper.find(ActivitiesListRow).length).toEqual(4);
  });
});