import * as racesApi from "./RacesApi";

export const setPageLoading = data => {
  return {
    type: "SET_PAGE_LOADING",
    payload: data
  };
};

export const getRacesData = () => {
  return function (dispatch) {
    return racesApi.getRaces().then(races => {
      const retrievedRaces = races.map((race) => {
        return {
          raceName: race.name,
          raceDate: race.date,
          raceId: race.id,
          isCompleted: race.completed
        };
      });
      dispatch(getRacesSuccess(retrievedRaces));
      dispatch(setPageLoading(false));
    }).catch(() => {
      dispatch(setPageLoading(false));
      dispatch(getRacesDataError(true));
    });
  };
};

export const getRacesSuccess = races => {
  return {
    type: "GET_RACES_SUCCESS",
    payload: races
  };
};

export const getRacesDataError = data => {
  return {
    type: "GET_RACES_DATA_ERROR",
    payload: data
  };
};

export const deleteRace = id => {
  return function (dispatch) {
    return racesApi.deleteRace(id).then(() => {
      dispatch(deleteRaceSuccess(id));
    }).catch(error => {
      throw(error);
    });
  };
};

export const deleteRaceSuccess = id => {
  return {
    type: "DELETE_RACE_SUCCESS",
    payload: id
  };
};

export const setCompletedStatus = raceId => {
  return function (dispatch) {
    return racesApi.setCompletedStatus(raceId).then((race) => {
      let completedRace = {};
      completedRace.raceName = race.name;
      completedRace.raceDate = race.date;
      completedRace.raceId = race.id;
      completedRace.isCompleted = race.completed;
      dispatch(setCompletedStatusSuccess(completedRace));
    }).catch(error => {
      throw(error);
    });
  };
};

export const setCompletedStatusSuccess = race => {
  return {
    type: "SET_COMPLETED_STATUS_SUCCESS",
    payload: race
  };
};

export const resetData = () => {
  return {
    type: "RESET_DATA"
  };
};