import expect from 'expect';
import React from 'react';
import * as Actions from '../RacesActions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

describe('The Races component actions', ()=> {
  describe('synchronous actions', ()=> {
    it('setPageLoading returns SET_PAGE_LOADING action type and payload', ()=> {
      let expectedResult = Actions.setPageLoading("payload");
      expect(expectedResult.type).toEqual("SET_PAGE_LOADING");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('getRacesSuccess returns GET_RACES_SUCCESS action type and payload', ()=> {
      let expectedResult = Actions.getRacesSuccess("payload");
      expect(expectedResult.type).toEqual("GET_RACES_SUCCESS");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('deleteRaceSuccess returns DELETE_RACE_SUCCESS action type and payload', ()=> {
      let expectedResult = Actions.deleteRaceSuccess("payload");
      expect(expectedResult.type).toEqual("DELETE_RACE_SUCCESS");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('resetData returns RESET_DATA action type', ()=> {
      let expectedResult = Actions.resetData("payload");
      expect(expectedResult.type).toEqual("RESET_DATA");
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

    it('getRacesData returns 200 success and dispatches action calls', (done) => {
      let apiRaces = [{name: 'parkrun1', date: '01/01/2018', id: 1, completed: false},
                    {name: 'parkrun2', date: '02/02/2018', id: 2, completed: false},
                    {name: 'parkrun3', date: '03/03/2018', id: 3, completed: false},
                    {name: 'parkrun4', date: '04/04/2018', id: 4, completed: false}];

      let modelRaces = [{raceName: 'parkrun1', raceDate: '01/01/2018', raceId: 1, isCompleted: false},
        {raceName: 'parkrun2', raceDate: '02/02/2018', raceId: 2, isCompleted: false},
        {raceName: 'parkrun3', raceDate: '03/03/2018', raceId: 3, isCompleted: false},
        {raceName: 'parkrun4', raceDate: '04/04/2018', raceId: 4, isCompleted: false}];

      moxios.stubRequest('http://localhost:8080/api/v1/races', {
        status: 200,
        response: apiRaces
      });

      const expectedActions = [
        {type: "GET_RACES_SUCCESS", payload: modelRaces},
        {type: "SET_PAGE_LOADING", payload: false}
      ];

      const store = mockStore({races: []}, expectedActions);

      return store.dispatch(Actions.getRacesData()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("GET_RACES_SUCCESS");
        expect(actions[0].payload).toEqual(modelRaces);
        expect(actions[1].type).toEqual("SET_PAGE_LOADING");
        expect(actions[1].payload).toEqual(false);
        done();
      });
    });

    it('deleteRace returns 200 success and dispatches action calls', (done) => {
      moxios.stubRequest('http://localhost:8080/api/v1/deleteRace/1', {
        status: 200,
        response: 1
      });

      const expectedActions = [
        {type: "DELETE_RACE_SUCCESS", payload: 1}
      ];

      const store = mockStore({races: []}, expectedActions);

      return store.dispatch(Actions.deleteRace(1)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("DELETE_RACE_SUCCESS");
        expect(actions[0].payload).toEqual(1);
        done();
      });
    });
  });
});