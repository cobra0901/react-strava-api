import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import ElevationGain from '../ElevationGain';
import * as Methods from '../ElevationGain';
import {Line} from 'react-chartjs-2';

describe('The ElevationGain component', ()=> {
  describe('the component', () => {

    it('renders a Line component', ()=> {
      let laps = [{id: 1, name: 'Lap 1'},
        {id: 2, name: 'Lap 2'},
        {id: 3, name: 'Lap 3'},
        {id: 4, name: 'Lap 4'}];

      let wrapper = shallow(<ElevationGain laps={laps}/>);
      expect(wrapper.find(Line).length).toEqual(1);
    });
  });

  describe('the methods', () => {
    it('getLabels returns an array of label values', ()=> {
      let laps = [{id: 1, name: 'Lap 1'},
        {id: 2, name: 'Lap 2'},
        {id: 3, name: 'Lap 3'},
        {id: 4, name: 'Lap 4'}];

      let result = Methods.getLabels(laps);
      expect(result[0]).toEqual("Lap 1");
      expect(result[3]).toEqual("Lap 4");
    });

    it('getElevationGain returns an array of total_elevation_gain values', ()=> {
      let laps = [{id: 1, name: 'Lap 1', total_elevation_gain: 50},
        {id: 2, name: 'Lap 2', total_elevation_gain: 100},
        {id: 3, name: 'Lap 3', total_elevation_gain: 150},
        {id: 4, name: 'Lap 4', total_elevation_gain: 200}];

      let result = Methods.getElevationGain(laps);
      expect(result[0]).toEqual(50);
      expect(result[3]).toEqual(200);
    });
  });
});