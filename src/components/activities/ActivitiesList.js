import React from 'react';
import PropTypes from 'prop-types';
import ActivitiesListRow from './ActivitiesListRow';

const ActivitiesList = ({currentResultsSet}) => {
  return (
      <table className="table">
        <thead>
          <tr>
            <th className="col-md-4">Name</th>
            <th className="col-md-2"></th>
            <th className="col-md-3">Distance (Miles)</th>
            <th className="col-md-3">Date</th>
          </tr>
        </thead>
        <tbody>
        {currentResultsSet.map((activity, index) => {
          return (
              <ActivitiesListRow key={index} activity={activity}/>
          );
        })}
        </tbody>
      </table>
  );
};

ActivitiesList.propTypes = {
  currentResultsSet: PropTypes.array.isRequired
};

export default ActivitiesList;