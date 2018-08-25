import * as ActivityDetailAPI from './activityDetailAPI';

export const setPageLoading = data => {
  return {
    type: "SET_PAGE_LOADING",
    payload: data
  };
};

export const getLapsByActivitySuccess = activityLaps => {
  return {
    type: "GET_LAPS_BY_ACTIVITY_SUCCESS",
    payload: activityLaps
  };
};

export const getLapsByActivityIdError = data => {
  return {
    type: "GET_LAPS_BY_ACTIVITY_ERROR",
    payload: data
  };
};

export const getLapsByActivityId = activityId => {
  return function(dispatch) {
    return ActivityDetailAPI.getLapsByActivityId(activityId).then(activityLaps => {
      dispatch(getLapsByActivitySuccess(activityLaps));
      dispatch(setPageLoading(false));
    }).catch(() => {
      dispatch(setPageLoading(false));
      dispatch(getLapsByActivityIdError(true));
    });
  };
};