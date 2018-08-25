import initialState from './RaceInfoFormSchema';

export const raceInfoFormReducer = (state = initialState, action) => {

  switch (action.type) {

    case "GET_RACE_SUCCESS": {
      return Object.assign({}, state, {
        race: action.payload,
        originalRaceName: action.payload.raceName,
        originalRaceDate: action.payload.raceDate
      });
    }

    case "UPDATE_RACE_NAME": {
      let race = JSON.parse(JSON.stringify(state.race));
      race.raceName = action.payload;

      return Object.assign({}, state, {
        race: race
      });
    }

    case "UPDATE_RACE_DATE": {
      let race = JSON.parse(JSON.stringify(state.race));
      race.raceDate = action.payload;

      return Object.assign({}, state, {
        race: race
      });
    }

    case "SET_PAGE_MODE": {
      return Object.assign({}, state, {
        pageMode: action.payload
      });
    }

    case "RESET_RACE_INFO_DATA": {
      let race = JSON.parse(JSON.stringify(state.race));
      race = initialState.race;

      return Object.assign({}, state, {
        race: race
      });
    }

    default:
      return state;
  }
};

export default raceInfoFormReducer;