import * as racesApi from "./RaceInfoFormApi";
import {browserHistory} from "react-router";

export const getRace = raceId => {
  return function (dispatch) {
    return racesApi.getRace(raceId).then(race => {
      let retrievedRace = {
        raceName: race.name,
        raceDate: race.date,
        raceId: race.id,
        isCompleted: race.completed
      };
      dispatch(getRaceSuccess(retrievedRace));
    }).catch(error => {
      throw(error);
    });
  };
};

export const getRaceSuccess = race => {
  return {
    type: "GET_RACE_SUCCESS",
    payload: race
  };
};

export const updateRaceName = data => {
  return {
    type: "UPDATE_RACE_NAME",
    payload: data
  };
};

export const updateRaceDate = data => {
  return {
    type: "UPDATE_RACE_DATE",
    payload: data
  };
};

export const saveRace = race => {
  return function (dispatch) {
    return racesApi.saveRace(race).then(race => {
      let savedRace = {};
      savedRace.raceName = race.data.name;
      savedRace.raceDate = race.data.date;
      savedRace.raceId = race.data.id;
      savedRace.isCompleted = race.data.completed;
      browserHistory.push('/races');
      dispatch(saveRaceSuccess(savedRace));
    }).catch(error => {
      throw(error);
    });
  };
};

export const updateRace = race => {
  return function (dispatch) {
    return racesApi.updateRace(race).then(race => {
      let savedRace = {};
      savedRace.raceName = race.data.name;
      savedRace.raceDate = race.data.date;
      savedRace.raceId = race.data.id;
      savedRace.isCompleted = race.data.completed;
      browserHistory.push('/races');
      dispatch(saveRaceSuccess(savedRace));
    }).catch(error => {
      throw(error);
    });
  };
};

export const saveRaceSuccess = data => {
  return {
    type: "SAVE_RACE_SUCCESS",
    payload: data
  };
};

export const setPageMode = pageMode => {
  return {
    type: "SET_PAGE_MODE",
    payload: pageMode
  };
};

export const resetRaceInfoData = () => {
  return {
    type: "RESET_RACE_INFO_DATA"
  };
};