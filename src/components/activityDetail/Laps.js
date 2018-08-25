import React from 'react';
import PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';

export const getLabels = (laps) => {
  return laps.map((lap) => lap.name);
};

export const getLapTimes = (laps) => {
  let lapTimeSeconds = laps.map((lap) => lap.elapsed_time);
  let lapTimes = lapTimeSeconds.map((lapTime) =>{
    let minutes = Math.floor(lapTime / 60);
    let seconds = lapTime - minutes * 60;
    return `${minutes}.${seconds}`;
  });
  return lapTimes;
};

const getData = (laps) => {
  return {
    labels: getLabels(laps),
    datasets: [{
      label: 'Lap Times',
      data: getLapTimes(laps),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }]
  };
};

const getScaleData = () => {
  return {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Minutes"
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
};

const Laps = ({laps}) => {

  return (
      <div>
        <HorizontalBar
            data={getData(laps)}
            options={getScaleData()}
        />
      </div>
  );
};

Laps.propTypes = {
  laps: PropTypes.array.isRequired
};

export default Laps;