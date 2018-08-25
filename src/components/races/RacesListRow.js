import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import ReactTooltip from 'react-tooltip';

const RacesListRow = ({race, deleteRace, onSetCompletedStatus, completedTabActive}) => {
  return (
      <tr>
        <td className="col-md-4" style={{verticalAlign: "middle"}}>
          <Link to={"raceinfoupdate/"+race.raceId}>{race.raceName}</Link>
        </td>
        <td className="col-md-3" style={{verticalAlign: "middle"}}>
          {race.raceDate}
        </td>
        <td className="col-md-3">
          <button type="button"
                  className="btn btn-success btn-sm"
                  value={race.raceId}
                  disabled={race.isCompleted}
                  onClick={onSetCompletedStatus}>
            Mark Race Completed!
          </button>
        </td>
        <td className="col-md-1">
          <button
              style={{marginRight: '10px'}}
              type="button"
              className="btn btn-default btn-sm"
              value={race.raceId}
              onClick={deleteRace}
              data-tip="Delete Race"
              data-type="error">
            <ReactTooltip />
            <span className="glyphicon glyphicon-remove"></span>
          </button>

          {completedTabActive &&
          <button
              type="button"
              className="btn btn-default btn-sm"
              value={race.raceId}
              onClick={onSetCompletedStatus}
              data-tip="Restore Race"
              data-type="success">
            <ReactTooltip/>
            <span className="glyphicon glyphicon-repeat"></span>
          </button>}
        </td>
      </tr>
    );
};

RacesListRow.propTypes = {
  race: PropTypes.object.isRequired,
  deleteRace: PropTypes.func.isRequired,
  onSetCompletedStatus: PropTypes.func.isRequired,
  completedTabActive: PropTypes.string
};

export default RacesListRow;