import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router';
import {Races} from '../Races';
import {mapDispatchToProps, mapStateToProps} from '../../races/Races';
import {spy, stub} from 'sinon';
import * as Actions from '../../races/RacesActions';

describe('The Races component', ()=> {
  let props;

  beforeEach(() => {
    props = {
      pageLoading: false,
      races: [{
        raceName: 'Race 1',
        raceDate: '01/01/2018'
        },
        {
        raceName: 'Race 2',
        raceDate: '09/09/2018'
        }],
      onSetPageLoading: () => {return false;},
      onGetRacesData: () => {return false;},
      onDeleteRace: () => {return false;}
    };
  });

  describe('the component', ()=> {
    it('renders a react router Link with href', () => {
      let wrapper = shallow(<Races {...props}/>);
      expect(wrapper.find(Link).props().to).toEqual('raceinfo');
    });

    it('componentDidMount calls onSetPageLoading and onGetRacesData', () => {
      let onSetPageLoading = stub();
      props.onSetPageLoading = onSetPageLoading;
      let onGetRacesData = stub();
      props.onGetRacesData = onGetRacesData;
      shallow(<Races {...props}/>);

      expect(onSetPageLoading.calledOnce).toEqual(true);
      expect(onSetPageLoading.getCall(0).args[0]).toEqual(true);
      expect(onGetRacesData.calledOnce).toEqual(true);
    });

    it('deleteRace calls onDeleteRace', () => {
      let onDeleteRace = stub();
      props.onDeleteRace = onDeleteRace;

      let wrapper = shallow(<Races {...props}/>);
      wrapper.instance().deleteRace({currentTarget: {value: "1"}});

      expect(onDeleteRace.calledOnce).toEqual(true);
      expect(onDeleteRace.getCall(0).args[0]).toEqual(1);
    });
  });

  describe('mapDispatchToProps', () => {
    it('onSetPageLoading should call setPageLoading action and return action type', () => {
      const dispatchSpy = spy();
      const {onSetPageLoading} = mapDispatchToProps(dispatchSpy);
      onSetPageLoading(true);
      const expectedAction = Actions.setPageLoading(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });

    it('onGetRacesData should call getRacesData action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onGetRacesData} = mapDispatchToProps(dispatchSpy);
      onGetRacesData();
      const expectedAction = Actions.getRacesData();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onDeleteRace should call deleteRace action and return action type', () => {
      const dispatchSpy = spy();
      const {onDeleteRace} = mapDispatchToProps(dispatchSpy);
      onDeleteRace("1");
      const expectedAction = Actions.deleteRace("1");
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });
  });

  describe('mapStateToProps', () => {
    it('returns props with valid data', () => {
      let state = {
        RacesReducer: {
          pageLoading: props.pageLoading,
          races: props.races
        }
      };

      const result = mapStateToProps(state);
      expect(result.pageLoading).toEqual(false);
      expect(result.races[0].raceName).toEqual('Race 1');
      expect(result.races[0].raceDate).toEqual('01/01/2018');
      expect(result.races[1].raceName).toEqual('Race 2');
      expect(result.races[1].raceDate).toEqual('09/09/2018');
    });
  });
});