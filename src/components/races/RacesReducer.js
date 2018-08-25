import initialState from './RacesSchema';

export const racesReducer = (state = initialState, action) => {

  switch (action.type) {

    case "SET_PAGE_LOADING": {
      return Object.assign({}, state, {
        pageLoading: action.payload
      });
    }

    case "GET_RACES_SUCCESS": {
      return Object.assign({}, state, {
        races: action.payload
      });
    }

    case "SAVE_RACE_SUCCESS": {
      let races = [
        ...state.races.filter(race => race.raceId !== action.payload.raceId),
        Object.assign({}, action.payload)
      ];

      return Object.assign({}, state, {
        races: races
      });
    }

    case "DELETE_RACE_SUCCESS": {
      let races = [
          ...state.races.filter(race => race.raceId !== action.payload)
      ];

      return Object.assign({}, state, {
        races: races
      });
    }

    case "GET_RACES_DATA_ERROR": {
      return Object.assign({}, state, {
        retrieveRacesError: action.payload
      });
    }

    case "SET_COMPLETED_STATUS_SUCCESS": {
      let races = [
        ...state.races.map(race => (race.raceId === action.payload.raceId) ? action.payload : race)
      ];

      return Object.assign({}, state, {
        races: races
      });
    }

    case "RESET_DATA": {
      return Object.assign({}, state, {
        retrieveRacesError: false,
        pageMode: null
      });
    }

    default:
      return state;
  }
};

export default racesReducer;