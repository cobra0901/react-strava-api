import React from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';

export const getLabels = (laps) => {
  return laps.map((lap) => lap.name);
};

export const getElevationGain = (laps) => {
  return laps.map((lap) => lap.total_elevation_gain);
};

const getData = (laps) => {
  return {
    labels: getLabels(laps),
    datasets: [{
      label: 'Elevation Gain',
      data: getElevationGain(laps),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)'
      ],
      borderWidth: 1
    }]
  };
};

const getScaleData = () => {
  return {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Elevation (Meters)"
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
};

const ElevationGain = ({laps}) => {
  return (
      <div>
        <Line
            data={getData(laps)}
            options={getScaleData()}
        />
      </div>
  );
};

ElevationGain.propTypes = {
  laps: PropTypes.array.isRequired
};

export default ElevationGain;