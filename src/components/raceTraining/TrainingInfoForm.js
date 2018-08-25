import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import TextInput from '../common/TextInput';
import * as Actions from './RaceTrainingActions';

export class TrainingInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.updateWeekBeginning = this.updateWeekBeginning.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.updateDistance = this.updateDistance.bind(this);
    this.updatePace = this.updatePace.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.onSaveTrainingSession = this.onSaveTrainingSession.bind(this);
    this.cancelPage = this.cancelPage.bind(this);
  }

  componentWillUnmount(){
    this.props.onResetData();
  }

  updateWeekBeginning(event) {
    let weekBeginning = event.target.value;
    this.props.onUpdateWeekBeginning(weekBeginning);
  }

  updateDay(event) {
    let day = event.target.value;
    this.props.onUpdateDay(day);
  }

  updateDistance(event) {
    let distance = event.target.value;
    this.props.onUpdateDistance(distance);
  }

  updatePace(event) {
    let pace = event.target.value;
    this.props.onUpdatePace(pace);
  }

  updateNotes(event) {
    let notes = event.target.value;
    this.props.onUpdateNotes(notes);
  }

  onSaveTrainingSession(event) {
    event.preventDefault();
    let session = {
      weekBeginning: this.props.weekBeginning,
      day: this.props.day,
      distance: this.props.distance,
      pace: this.props.pace,
      notes: this.props.notes,
      raceid: parseInt(this.props.params.id)
    };

    this.props.onSaveTrainingSession(session);
    browserHistory.push(`/raceinfoupdate/${this.props.params.id}`);
  }

  cancelPage(event){
    // prevent the default link behavior of opening a new page
    event.preventDefault();
    browserHistory.push(`/raceInfoUpdate/${this.props.params.id}`);
  }

  render() {
    return(
        <div>
          <h1></h1>
          <div>
            <form>
              <div className="row">
                <div className="col-md-4">
                  <TextInput
                      id="weekBeginning"
                      name="weekBeginning"
                      label="Week Beginning"
                      value={this.props.weekBeginning}
                      onChange={this.updateWeekBeginning}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <TextInput
                    id="trainingDay"
                    name="trainingDay"
                    label="Day"
                    value={this.props.day}
                    onChange={this.updateDay}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <TextInput
                    id="trainingDistance"
                    name="trainingDistance"
                    label="Distance"
                    value={this.props.distance}
                    onChange={this.updateDistance}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <TextInput
                    id="trainingPace"
                    name="trainingPace"
                    label="Pace"
                    value={this.props.pace}
                    onChange={this.updatePace}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <TextInput
                    id="trainingNotes"
                    name="trainingNotes"
                    label="Notes"
                    value={this.props.notes}
                    onChange={this.updateNotes}
                  />
                </div>
              </div>
              <div className="row" style={{marginTop: "1Rem"}}>
                <div className="col-md-4">
                  <button
                      className="btn btn-success"
                      id="saveTrainingSession"
                      type="button"
                      onClick={this.onSaveTrainingSession}>
                      Save Training Session
                  </button>
                </div>
                <div className="col-md-4 pull-right" style={{marginTop: "0.75Rem"}}>
                  <a href=""
                     id="cancelTrainingPage"
                     onClick={this.cancelPage}>
                     Cancel
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onUpdateWeekBeginning: weekBeginning => {
      dispatch(Actions.updateWeekBeginning(weekBeginning));
    },
    onUpdateDay: day => {
      dispatch(Actions.updateDay(day));
    },
    onUpdateDistance: distance => {
      dispatch(Actions.updateDistance(distance));
    },
    onUpdatePace: pace => {
      dispatch(Actions.updatePace(pace));
    },
    onUpdateNotes: notes => {
      dispatch(Actions.updateNotes(notes));
    },
    onResetData: () => {
      dispatch(Actions.resetData());
    },
    onSaveTrainingSession: session => {
      dispatch(Actions.saveTrainingSession(session));
    }
  };
};

export const mapStateToProps = state => {
  return {
    weekBeginning: state.RaceTrainingReducer.trainingSession.weekBeginning,
    day: state.RaceTrainingReducer.trainingSession.day,
    distance: state.RaceTrainingReducer.trainingSession.distance,
    pace: state.RaceTrainingReducer.trainingSession.pace,
    notes: state.RaceTrainingReducer.trainingSession.notes
  };
};

TrainingInfoForm.propTypes = {
  onUpdateWeekBeginning: PropTypes.func.isRequired,
  onUpdateDay: PropTypes.func.isRequired,
  onUpdateDistance: PropTypes.func.isRequired,
  onUpdatePace: PropTypes.func.isRequired,
  onUpdateNotes: PropTypes.func.isRequired,
  onResetData: PropTypes.func.isRequired,
  onSaveTrainingSession: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  weekBeginning: PropTypes.string,
  day: PropTypes.string,
  distance: PropTypes.string,
  pace: PropTypes.string,
  notes: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainingInfoForm);