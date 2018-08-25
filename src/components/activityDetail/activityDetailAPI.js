import axios from 'axios';

const access_token = process.env.ACCESS_TOKEN;

export const getLapsByActivityId = activityId => {
  return axios.get('https://www.strava.com/api/v3/activities/' + activityId + '/laps?per_page=1&access_token=' + access_token).then((
      results => {
        // console.log(results.data);
        return results.data;
      }
  ));
};