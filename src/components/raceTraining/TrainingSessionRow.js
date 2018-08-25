import React from 'react';
import PropTypes from 'prop-types';

export const TrainingSessionRow = ({session}) => {
  return (
      <tr>
        <td className="col-md-3" style={{verticalAlign: "middle"}}> {session.weekBeginning}</td>
        <td className="col-md-2" style={{verticalAlign: "middle"}}> {session.day}</td>
        <td className="col-md-2" style={{verticalAlign: "middle"}}> {session.distance}</td>
        <td className="col-md-2" style={{verticalAlign: "middle"}}>{session.pace}</td>
        <td className="col-md-3" style={{verticalAlign: "middle"}}>{session.notes}</td>
      </tr>
  );
};

TrainingSessionRow.propTypes = {
  session: PropTypes.object
};

export default TrainingSessionRow;