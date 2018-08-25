import axios from 'axios';

export const getRace = raceId => {
  return axios.get(`http://localhost:8080/api/v1/${raceId}`).then((race) => {
    return race.data;
  });
};

export const saveRace = race => {
  let raceToSave = {
    name: race.raceName,
    date: race.raceDate,
    completed: race.isCompleted
  };

  return axios.post('http://localhost:8080/api/v1/newRace', raceToSave).then((
      race => {
        return race;
      }
  ));
};

export const updateRace = race => {
  let raceToUpdate = {
    name: race.raceName,
    date: race.raceDate,
    id: race.raceId,
    completed: race.isCompleted
  };

  let raceId = race.raceId;

  return axios.put('http://localhost:8080/api/v1/updateRace/' + raceId, raceToUpdate).then((
      race => {
        return race;
      }
  ));
};