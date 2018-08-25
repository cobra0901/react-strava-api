import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import {stub, spy} from 'sinon';
import {ActivityDetail, mapDispatchToProps, mapStateToProps} from '../ActivityDetail';
import Laps from '../Laps';
import ElevationGain from '../ElevationGain';
import * as Actions from '../ActivityDetailActions';

describe('The ActivityDetail component', ()=> {

  let props;

  beforeEach(() => {
    props = {
      pageLoading: false,
      activityLaps: [],
      activityLapsError: false,
      params: {id: 12345},
      onSetPageLoading: () => {},
      onGetLapsByActivityId: () => {}
    };
  });

  describe('the component', () => {
    it('componentDidMount calls onSetPageLoading and onGetLapsByActivityId', ()=> {
      let onSetPageLoading = stub();
      props.onSetPageLoading = onSetPageLoading;
      let onGetLapsByActivityId = stub();
      props.onGetLapsByActivityId = onGetLapsByActivityId;

      shallow(<ActivityDetail {...props}/>);
      expect(onSetPageLoading.calledOnce).toEqual(true);
      expect(onSetPageLoading.getCall(0).args[0]).toEqual(true);
      expect(onGetLapsByActivityId.calledOnce).toEqual(true);
    });

    it('renders Laps and ElevationGain components when page is not loading', ()=> {
      let wrapper = shallow(<ActivityDetail {...props}/>);
      expect(wrapper.find(Laps).length).toEqual(1);
      expect(wrapper.find(ElevationGain).length).toEqual(1);
    });

    it('does not render Laps and ElevationGain components when page is loading', ()=> {
      props.pageLoading = true;
      let wrapper = shallow(<ActivityDetail {...props}/>);
      expect(wrapper.find(Laps).length).toEqual(0);
      expect(wrapper.find(ElevationGain).length).toEqual(0);
    });

    it('renders a loader when page is loading', ()=> {
      props.pageLoading = true;
      let wrapper = shallow(<ActivityDetail {...props}/>);
      expect(wrapper.find('#activityDetailLoader').length).toEqual(1);
    });

    it('getLaps returns an array of laps when activityLaps exists', ()=> {
      let activityLaps = [{id: 1, name: 'Lap 1'},
        {id: 2, name: 'Lap 2'},
        {id: 3, name: 'Lap 3'},
        {id: 4, name: 'Lap 4'}];

      props.activityLaps = activityLaps;

      let wrapper = shallow(<ActivityDetail {...props}/>);
      let result = wrapper.instance().getLaps();
      expect(result[0].id).toEqual(1);
      expect(result[0].name).toEqual('Lap 1');
    });

    it('getLaps returns an empty array of laps when activityLaps does not exist', ()=> {
      let wrapper = shallow(<ActivityDetail {...props}/>);
      let result = wrapper.instance().getLaps();
      expect(result).toEqual([]);
    });

    it('displayErrorToast is called once when component renders with activityLapsError error', ()=> {
      props.activityLapsError = true;
      let displayErrorToastStub = stub(ActivityDetail.prototype, "displayErrorToast").returns({});

      shallow(<ActivityDetail {...props}/>);
      expect(displayErrorToastStub.callCount).toEqual(1);
    });
  });

  describe('mapDispatchToProps', () => {
    it('onSetPageLoading should call setPageLoading action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onSetPageLoading} = mapDispatchToProps(dispatchSpy);
      onSetPageLoading(true);
      const expectedAction = Actions.setPageLoading(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onGetLapsByActivityId should call getLapsByActivityId action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onGetLapsByActivityId} = mapDispatchToProps(dispatchSpy);
      onGetLapsByActivityId("1459346776");
      const expectedAction = Actions.getLapsByActivityId("1459346776");
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });
  });

  describe('mapStateToProps', () => {
    it('returns props with valid data', () => {
      let state = {
        ActivityDetailReducer: {
          pageLoading: props.pageLoading,
          activityLaps: props.activityLaps,
          activityLapsError: props.activityLapsError
        }
      };

      const result = mapStateToProps(state);
      expect(result.pageLoading).toEqual(false);
      expect(result.activityLaps).toEqual([]);
      expect(result.activityLapsError).toEqual(false);
    });
  });
});