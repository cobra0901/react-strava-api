import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import {mapDispatchToProps, mapStateToProps} from '../RaceInfoForm';
import {spy, stub} from 'sinon';
import * as Actions from '../RaceInfoFormActions';
import {getTrainingSessions} from '../../raceTraining/RaceTrainingActions';
import {RaceInfoForm} from "../RaceInfoForm";
import TrainingSession from '../../raceTraining/TrainingSessionList';
import TextInput from '../../common/TextInput';
import {browserHistory} from "react-router";
import DatePicker from 'react-datepicker';

describe('The RaceInfoForm component', ()=> {
  let props;

  beforeEach(() => {
    props = {
      params: {id: 15},
      raceName: 'Race Name 1',
      raceDate: 'Race Date 1',
      raceId: 101,
      isCompleted: false,
      originalRaceName: 'Race Name 1',
      originalRaceDate: 'Race Date 1',
      pageMode: 'edit',
      trainingSessions: [{
        weekBeginning: '01/01/2018',
        day: 'Monday',
        distance: '8 Mile',
        pace: '8 Min / Mile',
        notes: 'Grass',
        raceId: 102
        }
      ],
      onUpdateRaceName: () => {return false;},
      onUpdateRaceDate: () => {return false;},
      onSaveRace: () => {return false;},
      onUpdateRace: () => {return false;},
      onResetRaceInfoData: () => {return false;},
      onGetRace: () => {return false;},
      onSetPageMode: () => {return false;},
      onGetTrainingSessions: () => {return false;}
    };
  });

  describe('the component', ()=> {
    it('componentWillUnmount calls onResetRaceInfoData', () => {
      let onResetRaceInfoData = stub();
      props.onResetRaceInfoData = onResetRaceInfoData;

      let wrapper = shallow(<RaceInfoForm {...props}/>);
      wrapper.instance().componentWillUnmount();

      expect(onResetRaceInfoData.calledOnce).toEqual(true);
    });

    it('renders one text input field', () => {
      let wrapper = shallow(<RaceInfoForm {...props}/>);
      expect(wrapper.find(TextInput).length).toEqual(1);
      expect(wrapper.find(TextInput).getElement().props.id).toEqual("racename");
      expect(wrapper.find(TextInput).getElement().props.name).toEqual("racename");
      expect(wrapper.find(TextInput).getElement().props.label).toEqual("Race Name");
      expect(wrapper.find(TextInput).getElement().props.value).toEqual("Race Name 1");
    });

    it('renders a DatePicker component', () => {
      let wrapper = shallow(<RaceInfoForm {...props}/>);
      expect(wrapper.find(DatePicker).length).toEqual(1);
      expect(wrapper.find(DatePicker).getElement().props.className).toEqual("form-control");
      expect(wrapper.find(DatePicker).getElement().props.id).toEqual("racedate");
      expect(wrapper.find(DatePicker).getElement().props.name).toEqual("racedate");
      expect(wrapper.find(DatePicker).getElement().props.dateFormat).toEqual("MM/DD/YYYY");
        expect(wrapper.find(DatePicker).getElement().props.value).toEqual("Race Date 1");
    });

    it('renders Save Race button and Cancel link when page mode is create', () => {
      props.pageMode = "create";

      let wrapper = shallow(<RaceInfoForm {...props}/>);
      expect(wrapper.find("#saveRace").length).toEqual(1);
      expect(wrapper.find("#saveRace").text()).toEqual("Save Race");

      expect(wrapper.find("#cancelNewRaceEntry").length).toEqual(1);
      expect(wrapper.find("#cancelNewRaceEntry").text()).toEqual("Cancel");
    });

    it('renders Update Race Details button and TrainingSession component when page mode is edit', () => {
      let wrapper = shallow(<RaceInfoForm {...props}/>);
      expect(wrapper.find("#updateRaceDetails").length).toEqual(1);
      expect(wrapper.find("#updateRaceDetails").text()).toEqual("Update Race Details");

      expect(wrapper.find(TrainingSession).length).toEqual(1);
    });

    it('updateRaceName calls onUpdateRaceName', () => {
      let onUpdateRaceName = stub();
      props.onUpdateRaceName = onUpdateRaceName;

      let wrapper = shallow(<RaceInfoForm {...props}/>);
      wrapper.instance().updateRaceName({target: {value: 'Race Name 1'}});

      expect(onUpdateRaceName.calledOnce).toEqual(true);
      expect(onUpdateRaceName.getCall(0).args[0]).toEqual('Race Name 1');
    });

    it('updateRaceDate calls onUpdateRaceDate', () => {
      let onUpdateRaceDate = stub();
      props.onUpdateRaceDate = onUpdateRaceDate;

      let event = {
        _d: 'Sat Sep 08 2018 17:06:00 GMT+0100 (British Summer Time)'
      };

      let wrapper = shallow(<RaceInfoForm {...props}/>);
      wrapper.instance().updateRaceDate(event);

      expect(wrapper.state().disableUpdateButton).toEqual(false);
      expect(wrapper.state().startDate).toEqual({ _d: 'Sat Sep 08 2018 17:06:00 GMT+0100 (British Summer Time)' });
      expect(onUpdateRaceDate.calledOnce).toEqual(true);
      expect(onUpdateRaceDate.getCall(0).args[0]).toEqual('09-08-2018');
    });

    it('saveRace calls onSaveRace', () => {
      let onSaveRace = stub();
      props.onSaveRace = onSaveRace;

      let expectedResult = {raceName: 'Race Name 1', raceDate: 'Race Date 1', isCompleted: false};

      let wrapper = shallow(<RaceInfoForm {...props}/>);
      wrapper.instance().saveRace({preventDefault: ()=>{}});

      expect(onSaveRace.calledOnce).toEqual(true);
      expect(onSaveRace.getCall(0).args[0]).toEqual(expectedResult);
    });

    it('updateRace calls onUpdateRace', () => {
      let onUpdateRace = stub();
      props.onUpdateRace = onUpdateRace;

      let expectedResult = {raceName: 'Race Name 1', raceDate: 'Race Date 1', raceId: 101, isCompleted: false};

      let wrapper = shallow(<RaceInfoForm {...props}/>);
      wrapper.instance().updateRace({preventDefault: ()=>{}});

      expect(onUpdateRace.calledOnce).toEqual(true);
      expect(onUpdateRace.getCall(0).args[0]).toEqual(expectedResult);
    });

    it('cancelNewRaceEntry calls browserHistory', () => {
      let browserHistoryStub = stub(browserHistory, "push");

      let wrapper = shallow(<RaceInfoForm {...props}/>);
      wrapper.instance().cancelNewRaceEntry({preventDefault: ()=>{}});

      expect(browserHistoryStub.calledOnce).toEqual(true);
    });
  });

  describe('mapDispatchToProps', () => {
    it('onGetRace should call getRace action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onGetRace} = mapDispatchToProps(dispatchSpy);
      onGetRace(props.raceId);
      const expectedAction = Actions.getRace(props.raceId);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onUpdateRaceName should call updateRaceName action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onUpdateRaceName} = mapDispatchToProps(dispatchSpy);
      onUpdateRaceName(props.raceName);
      const expectedAction = Actions.updateRaceName(props.raceName);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onUpdateRaceDate should call updateRaceDate action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onUpdateRaceDate} = mapDispatchToProps(dispatchSpy);
      onUpdateRaceDate(props.raceDate);
      const expectedAction = Actions.updateRaceDate(props.raceDate);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onSaveRace should call saveRace action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onSaveRace} = mapDispatchToProps(dispatchSpy);
      onSaveRace({raceName: 'Race Name 1', raceDate: 'Race Date 1', isCompleted: false});
      const expectedAction = Actions.saveRace({raceName: 'Race Name 1', raceDate: 'Race Date 1', isCompleted: false});
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onUpdateRace should call updateRace action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onUpdateRace} = mapDispatchToProps(dispatchSpy);
      onUpdateRace({raceName: 'Race Name 1', raceDate: 'Race Date 1', raceId: 1, isCompleted: false});
      const expectedAction = Actions.updateRace({raceName: 'Race Name 1', raceDate: 'Race Date 1', raceId: 1, isCompleted: false});
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onSetPageMode should call setPageMode action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onSetPageMode} = mapDispatchToProps(dispatchSpy);
      onSetPageMode(props.pageMode);
      const expectedAction = Actions.setPageMode(props.pageMode);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onGetTrainingSessions should call getTrainingSessions action and return action type', () => {
      const dispatchSpy = spy();
      const {onGetTrainingSessions} = mapDispatchToProps(dispatchSpy);
      onGetTrainingSessions();
      const expectedAction = getTrainingSessions();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });

    it('onResetRaceInfoData should call resetRaceInfoData action and return action type', () => {
      const dispatchSpy = spy();
      const {onResetRaceInfoData} = mapDispatchToProps(dispatchSpy);
      onResetRaceInfoData();
      const expectedAction = Actions.resetRaceInfoData();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });
  });

  describe('mapStateToProps', () => {
    it('returns props with valid data', () => {
      let state = {
        RaceInfoFormReducer: {
          race: {
            raceName: props.raceName,
            raceDate: props.raceDate,
            raceId: props.raceId,
            isCompleted: props.isCompleted
          },
          originalRaceName: props.originalRaceName,
          originalRaceDate: props.originalRaceDate,
          pageMode: props.pageMode
        },
        RaceTrainingReducer: {
          trainingSessions: props.trainingSessions
        }
      };

      const result = mapStateToProps(state);
      expect(result.raceName).toEqual('Race Name 1');
      expect(result.raceDate).toEqual('Race Date 1');
      expect(result.raceId).toEqual(101);
      expect(result.isCompleted).toEqual(false);
      expect(result.originalRaceName).toEqual('Race Name 1');
      expect(result.originalRaceDate).toEqual('Race Date 1');
      expect(result.pageMode).toEqual('edit');
      expect(result.trainingSessions[0].weekBeginning).toEqual('01/01/2018');
      expect(result.trainingSessions[0].day).toEqual('Monday');
      expect(result.trainingSessions[0].distance).toEqual('8 Mile');
      expect(result.trainingSessions[0].pace).toEqual('8 Min / Mile');
      expect(result.trainingSessions[0].notes).toEqual('Grass');
      expect(result.trainingSessions[0].raceId).toEqual(102);
    });
  });
});