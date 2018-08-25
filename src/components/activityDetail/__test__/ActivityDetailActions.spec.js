import expect from 'expect';
import React from 'react';
import * as Actions from '../ActivityDetailActions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

describe('The ActivityDetail component actions', ()=> {

  describe('synchronous actions', ()=> {
    it('setPageLoading returns SET_PAGE_LOADING action type and payload', ()=> {
      let expectedResult = Actions.setPageLoading("payload");
      expect(expectedResult.type).toEqual("SET_PAGE_LOADING");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('getLapsByActivitySuccess returns GET_LAPS_BY_ACTIVITY_SUCCESS action type and payload', ()=> {
      let expectedResult = Actions.getLapsByActivitySuccess("payload");
      expect(expectedResult.type).toEqual("GET_LAPS_BY_ACTIVITY_SUCCESS");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('getLapsByActivityIdError returns GET_LAPS_BY_ACTIVITY_ERROR action type and payload', ()=> {
      let expectedResult = Actions.getLapsByActivityIdError("payload");
      expect(expectedResult.type).toEqual("GET_LAPS_BY_ACTIVITY_ERROR");
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

    it('getLapsByActivityId returns 200 success and dispatches action calls', (done) => {
      const access_token = process.env.ACCESS_TOKEN;
      let activityLaps = [{id: 1, name: 'Lap 1'},
                          {id: 2, name: 'Lap 2'},
                          {id: 3, name: 'Lap 3'},
                          {id: 4, name: 'Lap 4'}];

      moxios.stubRequest('https://www.strava.com/api/v3/activities/1459346776/laps?per_page=1&access_token=' + access_token, {
        status: 200,
        response: activityLaps
      });

      const expectedActions = [
        {type: "GET_LAPS_BY_ACTIVITY_SUCCESS", payload: activityLaps},
        {type: "SET_PAGE_LOADING", payload: false}
      ];

      const store = mockStore({activityLaps: []}, expectedActions);

      return store.dispatch(Actions.getLapsByActivityId("1459346776")).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("GET_LAPS_BY_ACTIVITY_SUCCESS");
        expect(actions[0].payload).toEqual(activityLaps);
        expect(actions[1].type).toEqual("SET_PAGE_LOADING");
        expect(actions[1].payload).toEqual(false);
        done();
      });
    });

    it('getLapsByActivityId returns 500 failure and throws error', (done) => {
      const access_token = process.env.ACCESS_TOKEN;
      const error = new Error('Error: Request failed with status code 800');

      moxios.stubRequest('https://www.strava.com/api/v3/activities/1459346776/laps?per_page=1&access_token=' + access_token, {
        status: 500,
        response: { error }
      });

      const expectedActions = [
        {type: "SET_PAGE_LOADING", payload: false},
        {type: "GET_LAPS_BY_ACTIVITY_ERROR", payload: true}
      ];

      const store = mockStore({activityLaps: []}, expectedActions);

      return store.dispatch(Actions.getLapsByActivityId("1459346776")).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("SET_PAGE_LOADING");
        expect(actions[0].payload).toEqual(false);
        expect(actions[1].type).toEqual("GET_LAPS_BY_ACTIVITY_ERROR");
        expect(actions[1].payload).toEqual(true);
        done();
      });
    });
  });
});