import expect from 'expect';
import React from 'react';
import * as Actions from '../ActivitiesActions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

describe('The Activities component actions', ()=> {

  describe('synchronous actions', ()=> {
    it('resetPage returns RESET_PAGE action type', ()=> {
      let expectedResult = Actions.resetPage();
      expect(expectedResult.type).toEqual("RESET_PAGE");
    });

    it('setPageLoading returns SET_PAGE_LOADING action type and payload', ()=> {
      let expectedResult = Actions.setPageLoading("payload");
      expect(expectedResult.type).toEqual("SET_PAGE_LOADING");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('setCurrentPage returns SET_CURRENT_PAGE action type and payload', ()=> {
      let expectedResult = Actions.setCurrentPage("payload");
      expect(expectedResult.type).toEqual("SET_CURRENT_PAGE");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('setCurrentResultSet returns SET_CURRENT_RESULTS_SET action type and payload', ()=> {
      let expectedResult = Actions.setCurrentResultSet("payload");
      expect(expectedResult.type).toEqual("SET_CURRENT_RESULTS_SET");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('getActivitiesDataSuccess returns GET_ACTIVITY_DATA_SUCCESS action type and payload', ()=> {
      let expectedResult = Actions.getActivitiesDataSuccess("payload");
      expect(expectedResult.type).toEqual("GET_ACTIVITY_DATA_SUCCESS");
      expect(expectedResult.payload).toEqual("payload");
    });
  });

  describe('asynchronous actions', ()=> {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('getActivityData returns 200 success and dispatches action calls', (done) => {
      const access_token = process.env.ACCESS_TOKEN;
      let activities = [{id: 1, name: 'parkrun1'},
                        {id: 2, name: 'parkrun2'},
                        {id: 3, name: 'parkrun3'},
                        {id: 4, name: 'parkrun4'}];

      moxios.stubRequest('https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=' + access_token, {
        status: 200,
        response: activities
      });

      const expectedActions = [
        {type: "GET_ACTIVITY_DATA_SUCCESS", payload: activities},
        {type: "SET_CURRENT_RESULTS_SET", payload: activities},
        {type: "SET_PAGE_LOADING", payload: false}
      ];

      const store = mockStore({activities: []}, expectedActions);

      return store.dispatch(Actions.getActivityData()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("GET_ACTIVITY_DATA_SUCCESS");
        expect(actions[0].payload).toEqual(activities);
        expect(actions[1].type).toEqual("SET_CURRENT_RESULTS_SET");
        expect(actions[1].payload).toEqual(activities);
        expect(actions[2].type).toEqual("SET_PAGE_LOADING");
        expect(actions[2].payload).toEqual(false);
        done();
      });
    });

    it('getActivityData returns 500 failure and throws error', (done) => {
      const access_token = process.env.ACCESS_TOKEN;
      const error = new Error('Error: Request failed with status code 800');

      moxios.stubRequest('https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=' + access_token, {
        status: 500,
        response: { error }
      });

      const expectedActions = [
        {type: "SET_PAGE_LOADING", payload: false},
        {type: "GET_ACTIVITY_DATA_FAILURE", payload: true}
      ];

      const store = mockStore({activities: []}, expectedActions);

      return store.dispatch(Actions.getActivityData()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("SET_PAGE_LOADING");
        expect(actions[0].payload).toEqual(false);
        expect(actions[1].type).toEqual("GET_ACTIVITY_DATA_ERROR");
        expect(actions[1].payload).toEqual(true);
        done();
      });
    });
  });
});