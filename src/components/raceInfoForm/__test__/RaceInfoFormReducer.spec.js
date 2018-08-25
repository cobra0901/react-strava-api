import expect from 'expect';
import initialState from '../RaceInfoFormSchema';
import {raceInfoFormReducer} from '../RaceInfoFormReducer';

describe('The RaceInfoFormReducer', () => {

  it('GET_RACE_SUCCESS', () => {
    let action = {
      type: 'GET_RACE_SUCCESS',
      payload: {
        raceName: "Race Name",
        raceDate: "Race Date"
      }
    };

    let expectedState = raceInfoFormReducer(initialState, action);
    expect(expectedState.race.raceName).toEqual('Race Name');
    expect(expectedState.race.raceDate).toEqual('Race Date');
    expect(expectedState.originalRaceName).toEqual('Race Name');
    expect(expectedState.originalRaceDate).toEqual('Race Date');

  });

  it('UPDATE_RACE_NAME', () => {
    let action = {
      type: 'UPDATE_RACE_NAME',
      payload: 'Race Name'
    };

    let expectedState = raceInfoFormReducer(initialState, action);
    expect(expectedState.race.raceName).toEqual('Race Name');
  });

  it('UPDATE_RACE_DATE', () => {
    let action = {
      type: 'UPDATE_RACE_DATE',
      payload: 'Race Date'
    };

    let expectedState = raceInfoFormReducer(initialState, action);
    expect(expectedState.race.raceDate).toEqual('Race Date');
  });

  it('SET_PAGE_MODE', () => {
    let action = {
      type: 'SET_PAGE_MODE',
      payload: 'Edit'
    };

    let expectedState = raceInfoFormReducer(initialState, action);
    expect(expectedState.pageMode).toEqual('Edit');
  });

  it('RESET_RACE_INFO_DATA', () => {
    let action = {
      type: 'RESET_RACE_INFO_DATA'
    };

    let expectedState = raceInfoFormReducer(initialState, action);
    expect(expectedState.race).toEqual(initialState.race);
  });

  it('Default Case', () => {
    let action = {
      type: 'DEFAULT'
    };

    let expectedState = raceInfoFormReducer(initialState, action);
    expect(expectedState).toEqual(initialState);
  });
});