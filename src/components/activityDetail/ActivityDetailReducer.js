import initialState from './ActivityDetailSchema';

export const activityDetailReducer = (state = initialState, action) => {

  switch(action.type) {

    case "SET_PAGE_LOADING": {
      return Object.assign({}, state, {
        pageLoading: action.payload
      });
    }

    case "GET_LAPS_BY_ACTIVITY_SUCCESS": {
      return Object.assign({}, state, {
        activityLaps: action.payload
      });
    }

    case "GET_LAPS_BY_ACTIVITY_ERROR": {
      return Object.assign({}, state, {
        activityLapsError: action.payload
      });
    }

    default:
      return state;
  }
};

export default activityDetailReducer;