import axios from 'axios';

export const getRaces = () => {
  return axios.get('http://localhost:8080/api/v1/races').then((races) => {
    return races.data;
  });
};

export const deleteRace = id => {
  return axios.delete('http://localhost:8080/api/v1/deleteRace/' + id).then(() => {
    return id;
  });
};

export const setCompletedStatus = id => {
  return axios.put('http://localhost:8080/api/v1/setCompletedStatus/' + id).then((
      race => {
        return race.data;
      }
  ));
};