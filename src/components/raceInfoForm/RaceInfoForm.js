import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import TrainingSession from '../raceTraining/TrainingSessionList';
import * as Actions from './RaceInfoFormActions';
import {getTrainingSessions} from '../raceTraining/RaceTrainingActions';
import TextInput from '../common/TextInput';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/en-gb';

export class RaceInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableUpdateButton: true,
      startDate: moment()
    };

    this.updateRaceName = this.updateRaceName.bind(this);
    this.updateRaceDate = this.updateRaceDate.bind(this);
    this.saveRace = this.saveRace.bind(this);
    this.updateRace = this.updateRace.bind(this);
    this.cancelNewRaceEntry = this.cancelNewRaceEntry.bind(this);
  }

  componentDidMount() {
    this.props.onSetPageMode('create');
    this.props.onGetTrainingSessions();

    if(this.props.params.id) {
      let raceId = this.props.params.id;
      this.props.onSetPageMode('edit');
      this.props.onGetRace(raceId);
    }
  }

  componentWillUnmount() {
    this.props.onResetRaceInfoData();
  }

  updateRaceName(event) {
    let disableUpdateButton = this.props.originalRaceName === event.target.value;
    this.setState({disableUpdateButton});

    let data = event.target.value;
    this.props.onUpdateRaceName(data);
  }

  updateRaceDate(event) {
    let formattedDate = moment(event._d).format('MM-DD-YYYY');
    let disableUpdateButton = this.props.originalRaceDate === formattedDate;
    this.setState({
      disableUpdateButton,
      startDate: event
    });

    this.props.onUpdateRaceDate(formattedDate);
  }

  saveRace(event) {
    event.preventDefault();
    let raceData = {};
    raceData.raceName = this.props.raceName;
    raceData.raceDate = this.props.raceDate;
    raceData.isCompleted = false;
    this.props.onSaveRace(raceData);
  }

  updateRace(event) {
    event.preventDefault();
    let raceData = {};
    raceData.raceName = this.props.raceName;
    raceData.raceDate = this.props.raceDate;
    raceData.raceId = this.props.raceId;
    raceData.isCompleted = this.props.isCompleted;
    this.props.onUpdateRace(raceData);
  }

  filterTrainingSessionsByRaceId() {
    return this.props.trainingSessions.filter((session => session.raceid == this.props.params.id));
  }

  cancelNewRaceEntry(event) {
    event.preventDefault();
    browserHistory.push("/races");
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
                      id="racename"
                      name="racename"
                      label="Race Name"
                      value={this.props.raceName}
                      onChange={this.updateRaceName}/>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="racedate">Date</label>
                      <DatePicker
                        className="form-control"
                        id="racedate"
                        name="racedate"
                        dateFormat="MM/DD/YYYY"
                        selected={this.state.startDate}
                        onChange={this.updateRaceDate}
                        value={this.props.raceDate}
                    />
                  </div>
                </div>
              </div>

              {this.props.pageMode === 'create' &&
                  <div>
                    <button
                        id="saveRace"
                        type="button"
                        className="btn btn-success btn-md"
                        onClick={this.saveRace}>Save Race
                    </button>

                    <a href=""
                       id="cancelNewRaceEntry"
                       className="pull-right"
                       onClick={this.cancelNewRaceEntry}>Cancel</a>
                  </div>}

              {this.props.pageMode === 'edit' && <button
                  id="updateRaceDetails"
                  type="button"
                  className="btn btn-primary btn-md"
                  disabled={this.state.disableUpdateButton}
                  onClick={this.updateRace}>Update Race Details
              </button>}

              {this.props.pageMode === 'edit' && <TrainingSession raceId={this.props.params.id} sessions={this.filterTrainingSessionsByRaceId()}/>}

            </form>
          </div>
        </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onGetRace: raceId => {
      dispatch(Actions.getRace(raceId));
    },
    onUpdateRaceName: data => {
      dispatch(Actions.updateRaceName(data));
    },
    onUpdateRaceDate: data => {
      dispatch(Actions.updateRaceDate(data));
    },
    onSaveRace: data => {
      dispatch(Actions.saveRace(data));
    },
    onUpdateRace: data => {
      dispatch(Actions.updateRace(data));
    },
    onSetPageMode: pageMode => {
      dispatch(Actions.setPageMode(pageMode));
    },
    onGetTrainingSessions: () => {
      dispatch(getTrainingSessions());
    },
    onResetRaceInfoData: () => {
      dispatch(Actions.resetRaceInfoData());
    }
  };
};

export const mapStateToProps = state => {
  return {
    raceName: state.RaceInfoFormReducer.race.raceName,
    raceDate: state.RaceInfoFormReducer.race.raceDate,
    raceId: state.RaceInfoFormReducer.race.raceId,
    isCompleted: state.RaceInfoFormReducer.race.isCompleted,
    originalRaceName: state.RaceInfoFormReducer.originalRaceName,
    originalRaceDate: state.RaceInfoFormReducer.originalRaceDate,
    pageMode: state.RaceInfoFormReducer.pageMode,
    trainingSessions: state.RaceTrainingReducer.trainingSessions
  };
};

RaceInfoForm.propTypes = {
  onUpdateRaceName: PropTypes.func.isRequired,
  onUpdateRaceDate: PropTypes.func.isRequired,
  onSaveRace: PropTypes.func.isRequired,
  onUpdateRace: PropTypes.func,
  onResetRaceInfoData: PropTypes.func,
  onGetRace: PropTypes.func,
  onSetPageMode: PropTypes.func,
  onGetTrainingSessions: PropTypes.func,
  resetData: PropTypes.func,
  raceName: PropTypes.string,
  raceDate: PropTypes.string,
  race: PropTypes.object,
  raceId: PropTypes.number,
  isCompleted: PropTypes.bool,
  originalRaceName: PropTypes.string,
  originalRaceDate: PropTypes.string,
  pageMode: PropTypes.string,
  params: PropTypes.object,
  trainingSessions: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(RaceInfoForm);