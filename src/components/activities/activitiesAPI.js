import axios from 'axios';

const access_token = process.env.ACCESS_TOKEN;

export const getActivityData = () => {
  return axios.get('https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=' + access_token).then((
      results => {
        // console.log(results.data)
        return results.data;
      }
  ));
};