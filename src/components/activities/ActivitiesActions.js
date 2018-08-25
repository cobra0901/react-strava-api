import * as ActivitiesAPI from './activitiesAPI';

export const resetPage = () => {
  return {
    type: "RESET_PAGE"
  };
};

export const setPageLoading = data => {
  return {
    type: "SET_PAGE_LOADING",
    payload: data
  };
};

export const setCurrentPage = data => {
  return {
    type: "SET_CURRENT_PAGE",
    payload: data
  };
};

export const setCurrentResultSet = data => {
  return {
    type: "SET_CURRENT_RESULTS_SET",
    payload: data
  };
};

export const getActivitiesDataSuccess = activities => {
  return {
    type: "GET_ACTIVITY_DATA_SUCCESS",
    payload: activities
  };
};

export const getActivitiesDataError = data => {
  return {
    type: "GET_ACTIVITY_DATA_ERROR",
    payload: data
  };
};

export const getActivityData = () => {
  return function(dispatch) {
    return ActivitiesAPI.getActivityData().then(activities => {
      dispatch(getActivitiesDataSuccess(activities));
      dispatch(setCurrentResultSet(activities.slice(0, 4)));
      dispatch(setPageLoading(false));
      dispatch(getActivitiesDataError(false));
    }).catch(() => {
      dispatch(setPageLoading(false));
      dispatch(getActivitiesDataError(true));
    });
  };
};