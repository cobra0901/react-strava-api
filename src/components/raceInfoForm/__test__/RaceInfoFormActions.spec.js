import expect from 'expect';
import React from 'react';
import * as Actions from '../RaceInfoFormActions';
import {browserHistory} from "react-router";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import {stub} from 'sinon';

describe('The Races component actions', ()=> {
  describe('synchronous actions', ()=> {
    it('updateRaceName returns UPDATE_RACE_NAME action type and payload', ()=> {
      let expectedResult = Actions.updateRaceName("payload");
      expect(expectedResult.type).toEqual("UPDATE_RACE_NAME");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('updateRaceDate returns UPDATE_RACE_DATE action type and payload', ()=> {
      let expectedResult = Actions.updateRaceDate("payload");
      expect(expectedResult.type).toEqual("UPDATE_RACE_DATE");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('saveRaceSuccess returns SAVE_RACE_SUCCESS action type and payload', ()=> {
      let expectedResult = Actions.saveRaceSuccess("payload");
      expect(expectedResult.type).toEqual("SAVE_RACE_SUCCESS");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('getRaceSuccess returns GET_RACE_SUCCESS action type and payload', ()=> {
      let expectedResult = Actions.getRaceSuccess("payload");
      expect(expectedResult.type).toEqual("GET_RACE_SUCCESS");
      expect(expectedResult.payload).toEqual("payload");
    });

    it('setPageMode returns SET_PAGE_MODE action type and payload', ()=> {
      let expectedResult = Actions.setPageMode("edit");
      expect(expectedResult.type).toEqual("SET_PAGE_MODE");
      expect(expectedResult.payload).toEqual("edit");
    });

    it('resetData returns RESET_DATA action type', ()=> {
      let expectedResult = Actions.resetRaceInfoData("payload");
      expect(expectedResult.type).toEqual("RESET_RACE_INFO_DATA");
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
      browserHistory.push.restore();
    });

    it('saveRace returns 200 success and dispatches action calls', (done) => {
      let apiRace = {name: 'parkrun1', date: '01/01/2018', id: 1, completed: false};
      let modelRace = {raceName: 'parkrun1', raceDate: '01/01/2018', raceId: 1, isCompleted: false};

      moxios.stubRequest('http://localhost:8080/api/v1/newRace', {
        status: 200,
        response: apiRace
      });

      let browserHistoryStub = stub(browserHistory, "push").returns({});

      const expectedActions = [
        {type: "SAVE_RACE_SUCCESS", payload: modelRace}
      ];

      const store = mockStore({races: []}, expectedActions);

      return store.dispatch(Actions.saveRace(modelRace)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("SAVE_RACE_SUCCESS");
        expect(actions[0].payload).toEqual(modelRace);
        expect(browserHistoryStub.callCount).toEqual(1);
        done();
      });
    });

    it('updateRace returns 200 success and dispatches action calls', (done) => {
      let apiRace = {name: 'parkrun1', date: '01/01/2018', id: 1, completed: false};
      let modelRace = {raceName: 'parkrun1', raceDate: '01/01/2018', raceId: 1, isCompleted: false};

      moxios.stubRequest('http://localhost:8080/api/v1/updateRace/1', {
        status: 200,
        response: apiRace
      });

      let browserHistoryStub = stub(browserHistory, "push").returns({});

      const expectedActions = [
        {type: "SAVE_RACE_SUCCESS", payload: modelRace}
      ];

      const store = mockStore({races: []}, expectedActions);

      return store.dispatch(Actions.updateRace(modelRace)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual("SAVE_RACE_SUCCESS");
        expect(actions[0].payload).toEqual(modelRace);
        expect(browserHistoryStub.callCount).toEqual(1);
        done();
      });
    });
  });
});