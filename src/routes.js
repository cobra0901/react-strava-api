import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from "./components/App";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import Activities from "./components/activities/Activities";
import ActivityDetail from './components/activityDetail/ActivityDetail';
import Races from './components/races/Races';
import RaceInfoForm from './components/raceInfoForm/RaceInfoForm';
import TrainingInfoForm from './components/raceTraining/TrainingInfoForm';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="activities" component={Activities} />
      <Route path="races" component={Races} />
      <Route path="raceinfo" component={RaceInfoForm} />
      <Route path="raceinfoupdate/:id" component={RaceInfoForm} />
      <Route path="training/:id" component={TrainingInfoForm} />
      <Route path="activities/:id" component={ActivityDetail} />
      <Route path="about" component={AboutPage} />
    </Route>
);