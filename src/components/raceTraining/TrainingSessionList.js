import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import TrainingSessionRow from './TrainingSessionRow';

export const TrainingSession = ({raceId, sessions}) => {
  return (
      <div className="panel panel-info" style={{marginTop: "6Rem"}}>
        <div className="panel-heading">
          <h3 className="panel-title">Race Training Sessions
          </h3>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th>Week Beginning</th>
                <th>Day</th>
                <th>Distance</th>
                <th>Pace</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
            {sessions.map((session) => {
              return (
                  <TrainingSessionRow session={session} key={session.id}/>);
            })}
            </tbody>
          </table>
        </div>

        <div className="panel-footer">
            <Link to={"/training/"+raceId} className="btn btn-success">Add Session</Link>
        </div>
      </div>
  );
};

TrainingSession.propTypes = {
  raceId: PropTypes.number.isRequired,
  sessions: PropTypes.array
};

export default TrainingSession;