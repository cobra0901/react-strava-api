import expect from 'expect';
import initialState from '../ActivitiesSchema';
import {activitiesReducer} from '../ActivitiesReducer';

describe('The ActivitiesReducer', () => {
  it('RESET_PAGE', () => {
    let action = {
      type: 'RESET_PAGE'
    };

    let expectedState = activitiesReducer(initialState, action);
    expect(expectedState).toEqual(initialState);
  });

  it('SET_PAGE_LOADING', () => {
    let action = {
      type: 'SET_PAGE_LOADING',
      payload: true
    };

    let expectedState = activitiesReducer(initialState, action);
    expect(expectedState.pageLoading).toEqual(true);
  });

  it('SET_CURRENT_PAGE', () => {
    let action = {
      type: 'SET_CURRENT_PAGE',
      payload: 4
    };

    let expectedState = activitiesReducer(initialState, action);
    expect(expectedState.currentPage).toEqual(4);
  });

  it('SET_CURRENT_RESULTS_SET', () => {
    let action = {
      type: 'SET_CURRENT_RESULTS_SET',
      payload: [{activity: {activityName: 'Race 1', activityDistance: '3.5'}}]
    };

    let expectedState = activitiesReducer(initialState, action);
    expect(expectedState.currentResultsSet[0].activity.activityName).toEqual('Race 1');
    expect(expectedState.currentResultsSet[0].activity.activityDistance).toEqual('3.5');
  });

  it('GET_ACTIVITY_DATA_SUCCESS', () => {
    let action = {
      type: 'GET_ACTIVITY_DATA_SUCCESS',
      payload: [{activity: {activityName: 'Race 1', activityDistance: '3.5'}}]
    };

    let expectedState = activitiesReducer(initialState, action);
    expect(expectedState.activities[0].activity.activityName).toEqual('Race 1');
    expect(expectedState.activities[0].activity.activityDistance).toEqual('3.5');
  });

  it('GET_ACTIVITY_DATA_ERROR', () => {
    let action = {
      type: 'GET_ACTIVITY_DATA_ERROR',
      payload: true
    };

    let expectedState = activitiesReducer(initialState, action);
    expect(expectedState.activitiesDataError).toEqual(true);
  });

  it('Default Case', () => {
    let action = {
      type: 'DEFAULT'
    };

    let expectedState = activitiesReducer(initialState, action);
    expect(expectedState).toEqual(initialState);
  });
});