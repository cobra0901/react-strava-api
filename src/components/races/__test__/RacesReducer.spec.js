import expect from 'expect';
import initialState from '../RacesSchema';
import {racesReducer} from '../RacesReducer';

describe('The RacesReducer', () => {
  it('SET_PAGE_LOADING', () => {
    let action = {
      type: 'SET_PAGE_LOADING',
      payload: true
    };

    let expectedState = racesReducer(initialState, action);
    expect(expectedState.pageLoading).toEqual(true);
  });

  it('GET_RACES_SUCCESS', () => {
    let action = {
      type: 'GET_RACES_SUCCESS',
      payload: [{race: {raceName: 'Race 1', raceDate: '01/01/2018', raceId: 1}}]
    };

    let expectedState = racesReducer(initialState, action);
    expect(expectedState.races[0].race.raceName).toEqual('Race 1');
    expect(expectedState.races[0].race.raceDate).toEqual('01/01/2018');
    expect(expectedState.races[0].race.raceId).toEqual(1);
  });

  it('RESET_DATA', () => {
    let action = {
      type: 'RESET_DATA'
    };

    let expectedState = racesReducer(initialState, action);
    expect(expectedState.retrieveRacesError).toEqual(false);
    expect(expectedState.pageMode).toEqual(null);
  });

  it('SAVE_RACE_SUCCESS', () => {
    initialState.races = [
        {raceName: 'Race Name 1', raceDate: '01/01/2018', raceId: 1},
        {raceName: 'Race Name 2', raceDate: '01/01/2018', raceId: 2}];

    let action = {
      type: 'SAVE_RACE_SUCCESS',
      payload: {raceName: 'Race Name 3', raceDate: '09/09/2018', raceId: 3}
    };

    let expectedState = racesReducer(initialState, action);
    expect(expectedState.races[2].raceName).toEqual('Race Name 3');
    expect(expectedState.races[2].raceDate).toEqual('09/09/2018');
    expect(expectedState.races[2].raceId).toEqual(3);
  });

  it('DELETE_RACE_SUCCESS', () => {
    initialState.races = [
      {raceName: 'Race Name 1', raceDate: '01/01/2018', raceId: 1},
      {raceName: 'Race Name 2', raceDate: '02/02/2018', raceId: 2}];

    let action = {
      type: 'DELETE_RACE_SUCCESS',
      payload: 2
    };

    let expectedState = racesReducer(initialState, action);
    expect(expectedState.races.length).toEqual(1);
    expect(expectedState.races[0].raceName).toEqual('Race Name 1');
    expect(expectedState.races[0].raceDate).toEqual('01/01/2018');
    expect(expectedState.races[0].raceId).toEqual(1);
  });

  it('Default Case', () => {
    let action = {
      type: 'DEFAULT'
    };

    let expectedState = racesReducer(initialState, action);
    expect(expectedState).toEqual(initialState);
  });
});