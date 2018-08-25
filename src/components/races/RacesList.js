import React from 'react';
import PropTypes from 'prop-types';
import RacesListRow from './RacesListRow';

const RacesList = ({races, deleteRace, onHandleUpcomingRaces, onHandleCompletedRaces, upcomingTabActive, completedTabActive, onSetCompletedStatus}) => {
  return (
      <div>
        <ul className="nav nav-pills" style={{paddingBottom: "25px"}}>
          <ul className="nav nav-tabs">
            <li role="presentation"
                className={upcomingTabActive}>
              <a href=""
                 id="upcomingRaces"
                 onClick={onHandleUpcomingRaces}>Upcoming</a>
            </li>
            <li role="presentation"
                className={completedTabActive}>
              <a href=""
                 id="completedRaces"
                 onClick={onHandleCompletedRaces}>Completed</a>
            </li>
          </ul>
        </ul>
          <table className="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
              {races.filter((race) => {
                return upcomingTabActive ? !race.isCompleted : race.isCompleted;
              }).sort((a, b) => a.raceId > b.raceId).map((race) => {
                return (
                    <RacesListRow
                      key={race.raceId}
                      race={race}
                      deleteRace={deleteRace}
                      onSetCompletedStatus={onSetCompletedStatus}
                      completedTabActive={completedTabActive}/>);
              })}
            </tbody>
          </table>
      </div>
    );
};

RacesList.propTypes = {
  races: PropTypes.array.isRequired,
  deleteRace: PropTypes.func.isRequired,
  onHandleUpcomingRaces: PropTypes.func.isRequired,
  onHandleCompletedRaces: PropTypes.func.isRequired,
  upcomingTabActive: PropTypes.string,
  completedTabActive: PropTypes.string,
  onSetCompletedStatus: PropTypes.func
};

export default RacesList;