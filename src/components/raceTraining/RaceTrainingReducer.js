import initialState from './RaceTrainingSchema';

export const raceTrainingReducer = (state = initialState, action) => {

  switch (action.type) {

    case "UPDATE_WEEK_BEGINNING": {

      let trainingSession = JSON.parse(JSON.stringify(state.trainingSession));
      trainingSession.weekBeginning = action.payload;

      return Object.assign({}, state, {
        trainingSession
      });
    }

    case "UPDATE_DAY": {

      let trainingSession = JSON.parse(JSON.stringify(state.trainingSession));
      trainingSession.day = action.payload;

      return Object.assign({}, state, {
        trainingSession
      });
    }

    case "UPDATE_DISTANCE": {

      let trainingSession = JSON.parse(JSON.stringify(state.trainingSession));
      trainingSession.distance = action.payload;

      return Object.assign({}, state, {
        trainingSession
      });
    }

    case "UPDATE_PACE": {

      let trainingSession = JSON.parse(JSON.stringify(state.trainingSession));
      trainingSession.pace = action.payload;

      return Object.assign({}, state, {
        trainingSession
      });
    }

    case "UPDATE_NOTES": {

      let trainingSession = JSON.parse(JSON.stringify(state.trainingSession));
      trainingSession.notes = action.payload;

      return Object.assign({}, state, {
        trainingSession
      });
    }

    case "SAVE_TRAINING_SESSION": {

      let trainingSessions = [
          ...state.trainingSessions.filter(session => session.id !== action.payload.name),
          Object.assign({}, action.payload)
      ];

      return Object.assign({}, state, {
        trainingSessions: trainingSessions
      });
    }

    case "GET_TRAINING_SESSIONS_SUCCESS": {

      return Object.assign({}, state, {
        trainingSessions: action.payload
      });
    }

    case "RESET_DATA": {

      return Object.assign({}, state, initialState);
    }

    default:
      return state;
  }
};

export default raceTrainingReducer;