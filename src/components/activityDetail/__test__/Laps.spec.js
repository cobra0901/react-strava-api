import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import Laps from '../Laps';
import * as Methods from '../Laps';
import {HorizontalBar} from 'react-chartjs-2';

describe('The Laps component', ()=> {
  describe('the component', () => {
    it('renders a HorizontalBar component', ()=> {
      let laps = [{id: 1, name: 'Lap 1'},
        {id: 2, name: 'Lap 2'},
        {id: 3, name: 'Lap 3'},
        {id: 4, name: 'Lap 4'}];

      let wrapper = shallow(<Laps laps={laps}/>);
      expect(wrapper.find(HorizontalBar).length).toEqual(1);
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

    it('getLapTimes returns an array of elapsed_time values', ()=> {
      let laps = [{id: 1, name: 'Lap 1', elapsed_time: 519},
        {id: 2, name: 'Lap 2', elapsed_time: 515},
        {id: 3, name: 'Lap 3', elapsed_time: 510},
        {id: 4, name: 'Lap 4', elapsed_time: 500}];

      let result = Methods.getLapTimes(laps);
      expect(result[0]).toEqual('8.39');
      expect(result[3]).toEqual('8.20');
    });

  });
});