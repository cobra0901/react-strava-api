import axios from "axios/index";

export const saveTrainingSession = session => {

  return axios.post('http://localhost:8080/api/v1/newTrainingSession', session).then((
      savedSession => {
        return savedSession.data;
      }
  ));
};

export const getTrainingSessions = () => {
  return axios.get('http://localhost:8080/api/v1/trainingSessions').then((
      retrievedSessions => {
        return retrievedSessions.data;
      }
  ));
};