import initialState from './ActivitiesSchema';

export const activitiesReducer = (state = initialState, action) => {

  switch (action.type) {

    case "RESET_PAGE": {
      return Object.assign({}, state, initialState);
    }

    case "SET_PAGE_LOADING": {
      return Object.assign({}, state, {
        pageLoading: action.payload
      });
    }

    case "SET_CURRENT_PAGE": {
      return Object.assign({}, state, {
        currentPage: action.payload
      });
    }

    case "SET_CURRENT_RESULTS_SET": {
      return Object.assign({}, state, {
        currentResultsSet: action.payload
      });
    }

    case "GET_ACTIVITY_DATA_SUCCESS": {
      return Object.assign({}, state, {
        activities: action.payload
      });
    }

    case "GET_ACTIVITY_DATA_ERROR": {
      return Object.assign({}, state, {
        activitiesDataError: action.payload
      });
    }

    default:
      return state;
  }
};

export default activitiesReducer;