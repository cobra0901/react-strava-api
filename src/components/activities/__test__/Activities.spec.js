import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import {stub, spy} from 'sinon';
import {Activities, mapDispatchToProps, mapStateToProps} from '../Activities';
import Pagination from '../../pagination/Pagination';
import * as Actions from '../ActivitiesActions';

describe('The Activities component', ()=> {

  let props;

  beforeEach(() => {
    props = {
      pageLoading: false,
      currentPage: 1,
      resultsPerPage: 4,
      activities: [
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
        },
        {
          id: 5,
          name: 'parkrun5'
        },
        {
          id: 6,
          name: 'parkrun6'
        },
        {
          id: 7,
          name: 'parkrun7'
        },
        {
          id: 8,
          name: 'parkrun8'
        },
        {
          id: 9,
          name: 'parkrun9'
        },
        {
          id: 10,
          name: 'parkrun10'
        }
      ],
      currentResultsSet: [],
      activitiesDataError: false,
      onResetPage: () => {
      },
      onSetPageLoading: data => {
      },
      onGetActivityData: () => {
      },
      onSetCurrentResultSet: data => {
      },
      onSetCurrentPage: data => {
      }
    };
  });

  describe('the component', () => {
    it('componentDidMount calls onSetPageLoading and onGetActivityData', ()=> {
      let onSetPageLoading = stub();
      props.onSetPageLoading = onSetPageLoading;
      let onGetActivityData = stub();
      props.onGetActivityData = onGetActivityData;

      shallow(<Activities {...props}/>);
      expect(onSetPageLoading.calledOnce).toEqual(true);
      expect(onSetPageLoading.getCall(0).args[0]).toEqual(true);
      expect(onGetActivityData.calledOnce).toEqual(true);
    });

    it('componentWillUnmount calls onResetPage', ()=> {
      let onResetPage = stub();
      props.onResetPage = onResetPage;

      let wrapper = shallow(<Activities {...props}/>);
      wrapper.instance().componentWillUnmount();
      expect(onResetPage.calledOnce).toEqual(true);
    });

    it('does not render a Pagination component when page is loading', ()=> {
      props.pageLoading = true;
      let wrapper = shallow(<Activities {...props}/>);
      expect(wrapper.find(Pagination).length).toEqual(0);
    });

    it('does render a Pagination component when page is loaded', ()=> {
      let wrapper = shallow(<Activities {...props}/>);
      expect(wrapper.find(Pagination).length).toEqual(1);
    });

    it('getCurrentResultsSet returns a valid results set', ()=> {
      let wrapper = shallow(<Activities {...props}/>);

      let currentResultsSet = wrapper.instance().getCurrentResultsSet(1);
      expect(currentResultsSet.length).toEqual(4);
      expect(currentResultsSet[0].id).toEqual(1);
      expect(currentResultsSet[0].name).toEqual("parkrun1");
      expect(currentResultsSet[1].id).toEqual(2);
      expect(currentResultsSet[1].name).toEqual("parkrun2");
      expect(currentResultsSet[2].id).toEqual(3);
      expect(currentResultsSet[2].name).toEqual("parkrun3");
      expect(currentResultsSet[3].id).toEqual(4);
      expect(currentResultsSet[3].name).toEqual("parkrun4");
    });

    it('pageLeftonClick calls onSetCurrentResultSet with a valid current results set', ()=> {
      props.currentPage = 3;

      let onSetCurrentResultSet = stub();
      props.onSetCurrentResultSet = onSetCurrentResultSet;

      let expectedResult = [{
            id: 5,
            name: 'parkrun5'
          },
          {
            id: 6,
            name: 'parkrun6'
          },
          {
            id: 7,
            name: 'parkrun7'
          },
          {
            id: 8,
            name: 'parkrun8'
          }];

      let wrapper = shallow(<Activities {...props}/>);
      wrapper.instance().pageLeftonClick();
      expect(onSetCurrentResultSet.calledOnce).toEqual(true);
      expect(onSetCurrentResultSet.getCall(0).args[0]).toEqual(expectedResult);
    });

    it('pageLeftonClick calls onSetCurrentPage with a valid current page', ()=> {
      props.currentPage = 3;

      let onSetCurrentPage = stub();
      props.onSetCurrentPage = onSetCurrentPage;

      let wrapper = shallow(<Activities {...props}/>);
      wrapper.instance().pageLeftonClick();
      expect(onSetCurrentPage.calledOnce).toEqual(true);
      expect(onSetCurrentPage.getCall(0).args[0]).toEqual(2);
    });

    it('pageRightonClick calls onSetCurrentResultSet with a valid current results set', ()=> {
      props.currentPage = 1;

      let onSetCurrentResultSet = stub();
      props.onSetCurrentResultSet = onSetCurrentResultSet;

      let expectedResult = [{
        id: 5,
        name: 'parkrun5'
      },
        {
          id: 6,
          name: 'parkrun6'
        },
        {
          id: 7,
          name: 'parkrun7'
        },
        {
          id: 8,
          name: 'parkrun8'
        }];

      let wrapper = shallow(<Activities {...props}/>);

      wrapper.instance().pageRightonClick();
      expect(onSetCurrentResultSet.calledOnce).toEqual(true);
      expect(onSetCurrentResultSet.getCall(0).args[0]).toEqual(expectedResult);
    });

    it('pageRightonClick calls onSetCurrentPage with a valid current page', ()=> {
      props.currentPage = 1;

      let onSetCurrentPage = stub();
      props.onSetCurrentPage = onSetCurrentPage;

      let wrapper = shallow(<Activities {...props}/>);
      wrapper.instance().pageRightonClick();
      expect(onSetCurrentPage.calledOnce).toEqual(true);
      expect(onSetCurrentPage.getCall(0).args[0]).toEqual(2);
    });

    it('pageOnClick calls onSetCurrentResultSet with a valid current results set', ()=> {
      let onSetCurrentResultSet = stub();
      props.onSetCurrentResultSet = onSetCurrentResultSet;

      let expectedResult = [{
        id: 5,
        name: 'parkrun5'
      },
        {
          id: 6,
          name: 'parkrun6'
        },
        {
          id: 7,
          name: 'parkrun7'
        },
        {
          id: 8,
          name: 'parkrun8'
        }];

      let wrapper = shallow(<Activities {...props}/>);

      wrapper.instance().pageOnClick({target: {value: 2}});
      expect(onSetCurrentResultSet.calledOnce).toEqual(true);
      expect(onSetCurrentResultSet.getCall(0).args[0]).toEqual(expectedResult);
    });

    it('pageOnClick calls onSetCurrentPage with a valid current page', ()=> {
      let onSetCurrentPage = stub();
      props.onSetCurrentPage = onSetCurrentPage;

      let wrapper = shallow(<Activities {...props}/>);

      wrapper.instance().pageOnClick({target: {value: 2}});
      expect(onSetCurrentPage.calledOnce).toEqual(true);
      expect(onSetCurrentPage.getCall(0).args[0]).toEqual(2);
    });
  });

  describe('mapDispatchToProps', () => {
    it('onResetPage should call resetPage action and return action type', () => {
      const dispatchSpy = spy();
      const {onResetPage} = mapDispatchToProps(dispatchSpy);
      onResetPage();
      const expectedAction = Actions.resetPage();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });

    it('onSetPageLoading should call setPageLoading action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onSetPageLoading} = mapDispatchToProps(dispatchSpy);
      onSetPageLoading(true);
      const expectedAction = Actions.setPageLoading(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onGetActivityData should call getActivityData action and return action type', () => {
      const dispatchSpy = spy();
      const {onGetActivityData} = mapDispatchToProps(dispatchSpy);
      onGetActivityData();
      const expectedAction = Actions.getActivityData();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });

    it('onSetCurrentResultSet should call setCurrentResultSet action and return action type / payload', () => {
      const dispatchSpy = spy();
      const {onSetCurrentResultSet} = mapDispatchToProps(dispatchSpy);
      onSetCurrentResultSet(props.activities);
      const expectedAction = Actions.setCurrentResultSet(props.activities);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onSetCurrentPage should call setCurrentPage action', () => {
      const dispatchSpy = spy();
      const {onSetCurrentPage} = mapDispatchToProps(dispatchSpy);
      onSetCurrentPage(props.currentPage);
      const expectedAction = Actions.setCurrentPage(props.currentPage);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });

    it('onGetActivitiesDataError should call getActivitiesDataError action', () => {
      const dispatchSpy = spy();
      const {onGetActivitiesDataError} = mapDispatchToProps(dispatchSpy);
      onGetActivitiesDataError(props.currentPage);
      const expectedAction = Actions.getActivitiesDataError(props.currentPage);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.payload).toEqual(expectedAction.payload);
    });
  });

  describe('mapStateToProps', () => {
    it('returns props with valid data', () => {
      let state = {
        ActivitiesReducer: {
          pageLoading: props.pageLoading,
          activities: props.activities,
          currentResultsSet: props.currentResultsSet,
          currentPage: props.currentPage,
          resultsPerPage: props.resultsPerPage
        }
      };

      const result = mapStateToProps(state);
      expect(result.pageLoading).toEqual(false);
      expect(result.activities[0].id).toEqual(1);
      expect(result.activities[0].name).toEqual('parkrun1');
      expect(result.currentResultsSet).toEqual([]);
      expect(result.currentPage).toEqual(1);
      expect(result.resultsPerPage).toEqual(4);
    });
  });
});