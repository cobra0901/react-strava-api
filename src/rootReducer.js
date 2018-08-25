import {combineReducers} from 'redux';
import ActivitiesReducer from '../src/components/activities/ActivitiesReducer';
import ActivityDetailReducer from '../src/components/activityDetail/ActivityDetailReducer';
import RacesReducer from "./components/races/RacesReducer";
import RaceInfoFormReducer from "./components/raceInfoForm/RaceInfoFormReducer";
import RaceTrainingReducer from "./components/raceTraining/RaceTrainingReducer";

const rootReducer = combineReducers({
  ActivitiesReducer,
  ActivityDetailReducer,
  RacesReducer,
  RaceInfoFormReducer,
  RaceTrainingReducer
});

export default rootReducer;