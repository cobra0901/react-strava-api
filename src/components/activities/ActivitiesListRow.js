import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import moment from 'moment';

export const getWorkoutType = activity => {
  switch(activity.workout_type) {
    case 1: {
      return (
          <span className="label label-danger pull-left" style={{display: "inline-block", minWidth: "55px"}}>Race</span>
      );
    }
    case 3: {
      return (
          <span className="label label-success pull-left" style={{display: "inline-block", minWidth: "55px"}}>Workout</span>
      );
    }
    case 0: {
      return (
          <span className="label label-primary pull-left" style={{display: "inline-block", minWidth: "55px"}}>Run</span>
      );
    }
    case 10: {
      return (
          <span className="label label-warning pull-left" style={{display: "inline-block", minWidth: "55px"}}>Ride</span>
      );
    }
    default: {
      return (
          <span className="label label-default pull-left" style={{display: "inline-block", minWidth: "55px"}}>TBD</span>
      );
    }
  }
};

const ActivitiesListRow = ({activity}) => {
  const activityDistance = Math.round((activity.distance * 0.000621371192) * 100) / 100;
  const activityDate = moment(activity.start_date).format('MM-DD-YYYY');

  return (
    <tr>
      <td>
        <Link id="activityName" to={"activities/" + activity.id}>{activity.name}</Link>
      </td>
      <td id="workoutType">{getWorkoutType(activity)}</td>
      <td id="activityDistance">{activityDistance}</td>
      <td id="activityDate">{activityDate}</td>
    </tr>
  );
};

ActivitiesListRow.propTypes = {
  activity: PropTypes.object.isRequired
};

export default ActivitiesListRow;