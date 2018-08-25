import * as raceTrainingApi from "../raceTraining/RaceTrainingApi";

export const updateWeekBeginning = weekBeginning => {
  return {
    type: "UPDATE_WEEK_BEGINNING",
    payload: weekBeginning
  };
};

export const updateDay = day => {
  return {
    type: "UPDATE_DAY",
    payload: day
  };
};

export const updateDistance = distance => {
  return {
    type: "UPDATE_DISTANCE",
    payload: distance
  };
};

export const updatePace = pace => {
  return {
    type: "UPDATE_PACE",
    payload: pace
  };
};

export const updateNotes = notes => {
  return {
    type: "UPDATE_NOTES",
    payload: notes
  };
};

export const resetData = () => {
  return {
    type: "RESET_DATA"
  };
};

export const saveTrainingSessionSuccess = savedSession => {
  return {
    type: "SAVE_TRAINING_SESSION",
    payload: savedSession
  };
};

export const saveTrainingSession = session => {
  return function (dispatch) {
    return raceTrainingApi.saveTrainingSession(session).then(savedSession => {
      dispatch(saveTrainingSessionSuccess(savedSession));
    }).catch(error => {
      throw(error);
    });
  };
};

export const getTrainingSessionSuccess = sessions => {
  return {
    type: "GET_TRAINING_SESSIONS_SUCCESS",
    payload: sessions
  };
};

export const getTrainingSessions = () => {
  return function (dispatch) {
    return raceTrainingApi.getTrainingSessions().then(sessions => {
      dispatch(getTrainingSessionSuccess(sessions));
    }).catch(error => {
      throw(error);
    });
  };
};