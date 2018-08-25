import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import toastr from 'toastr';
import RacesList from './RacesList';
import {Link} from 'react-router';
import * as Actions from './RacesActions';

export class Races extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      upcomingTabActive: "active",
      completedTabActive: null
    };

    this.deleteRace = this.deleteRace.bind(this);
    this.onHandleUpcomingRaces = this.onHandleUpcomingRaces.bind(this);
    this.onHandleCompletedRaces = this.onHandleCompletedRaces.bind(this);
    this.onSetCompletedStatus = this.onSetCompletedStatus.bind(this);
  }

  componentDidMount(){
    this.props.onSetPageLoading(true);
    this.props.onGetRacesData();
  }

  componentWillUnmount(){
    this.props.onResetData();
  }

  deleteRace(event){
    const id = parseInt(event.currentTarget.value);
    this.props.onDeleteRace(id);
  }

  displayRaces(){
    return (
        <RacesList
            races={this.props.races}
            deleteRace={this.deleteRace}
            onHandleUpcomingRaces={this.onHandleUpcomingRaces}
            onHandleCompletedRaces={this.onHandleCompletedRaces}
            upcomingTabActive={this.state.upcomingTabActive}
            completedTabActive={this.state.completedTabActive}
            onSetCompletedStatus={this.onSetCompletedStatus}/>
    );
  }

  displayErrorToast() {
    toastr.error('Error retrieving Races: Please try again later');
  }

  onHandleUpcomingRaces(event) {
    event.preventDefault();
    this.setState({
      upcomingTabActive: "active",
      completedTabActive: null
    });
  }

  onHandleCompletedRaces(event) {
    event.preventDefault();
    this.setState({
      completedTabActive: "active",
      upcomingTabActive: null
    });
  }

  onSetCompletedStatus(event) {
    const raceId = parseInt(event.currentTarget.value);
    this.props.onSetCompletedStatus(raceId);
  }

  render() {
    return(
        <div>
          {this.props.pageLoading ? <div className="loader center"></div> :
            <div>
              <h1></h1>
              <div>
                {this.props.retrieveRacesError && this.displayErrorToast()}
              </div>
              {this.displayRaces()}
              <div>
                <Link to="raceinfo" className="btn btn-primary btn-sm">Add New Race</Link>
              </div>
            </div>}
        </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onSetPageLoading: data => {
      dispatch(Actions.setPageLoading(data));
    },
    onGetRacesData: () => {
      dispatch(Actions.getRacesData());
    },
    onDeleteRace: id => {
      dispatch(Actions.deleteRace(id));
    },
    onSetCompletedStatus: raceId => {
      dispatch(Actions.setCompletedStatus(raceId));
    },
    onResetData: () => {
      dispatch(Actions.resetData());
    }
  };
};

export const mapStateToProps = state => {
  return {
    pageLoading: state.RacesReducer.pageLoading,
    races: state.RacesReducer.races,
    retrieveRacesError: state.RacesReducer.retrieveRacesError
  };
};

Races.propTypes = {
  races: PropTypes.array,
  pageLoading: PropTypes.bool,
  retrieveRacesError: PropTypes.bool,
  onGetRacesData: PropTypes.func,
  onSetPageLoading: PropTypes.func,
  onDeleteRace: PropTypes.func,
  onResetData:PropTypes.func,
  onSetCompletedStatus:PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Races);