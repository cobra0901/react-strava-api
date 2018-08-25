import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import toastr from 'toastr';
import ActivitiesList from './ActivitiesList';
import Pagination from '../pagination/Pagination';
import * as Actions from './ActivitiesActions';

export class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.pageLeftonClick = this.pageLeftonClick.bind(this);
    this.pageRightonClick = this.pageRightonClick.bind(this);
    this.pageOnClick = this.pageOnClick.bind(this);
  }

  componentDidMount() {
    this.props.onSetPageLoading(true);
    this.props.onGetActivityData();
  }

  componentWillUnmount() {
    this.props.onResetPage();
  }

  displayActivities() {
    return (
        <ActivitiesList currentResultsSet={this.props.currentResultsSet}/>
      );
  }

  getCurrentResultsSet(currentPage) {
    let offset = (currentPage - 1) * this.props.resultsPerPage;
    let endset = currentPage * this.props.resultsPerPage;
    return this.props.activities.slice(offset, endset);
  }

  pageLeftonClick() {
    let currentPage = this.props.currentPage - 1;
    let currentResultsSet = this.getCurrentResultsSet(currentPage);

    this.props.onSetCurrentResultSet(currentResultsSet);
    this.props.onSetCurrentPage(currentPage);
  }

  pageRightonClick() {
    let currentPage = this.props.currentPage + 1;
    let currentResultsSet = this.getCurrentResultsSet(currentPage);

    this.props.onSetCurrentResultSet(currentResultsSet);
    this.props.onSetCurrentPage(currentPage);
  }

  pageOnClick(event) {
    let currentPage = parseInt(event.target.value);
    let currentResultsSet = this.getCurrentResultsSet(currentPage);

    this.props.onSetCurrentResultSet(currentResultsSet);
    this.props.onSetCurrentPage(currentPage);
  }

  displayErrorToast() {
    toastr.error('Error retrieving Activities: Please try again later');
  }

  render() {
    return (
        <div>
          {this.props.pageLoading ? <div className="loader center"></div> :
              <div>
                <h1></h1>
                <div>
                  <div>
                    {this.props.activitiesDataError && this.displayErrorToast()}
                  </div>
                  <div>
                    {this.displayActivities()}
                  </div>
                  <Pagination
                      pageLeftonClick={this.pageLeftonClick}
                      pageRightonClick={this.pageRightonClick}
                      pageOnClick={this.pageOnClick}
                      currentPage={this.props.currentPage}
                  />
                </div>
              </div>}
            </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onResetPage: () => {
      dispatch(Actions.resetPage());
    },
    onSetPageLoading: data => {
      dispatch(Actions.setPageLoading(data));
    },
    onGetActivityData: () => {
      dispatch(Actions.getActivityData());
    },
    onSetCurrentResultSet: data => {
      dispatch(Actions.setCurrentResultSet(data));
    },
    onSetCurrentPage: data => {
      dispatch(Actions.setCurrentPage(data));
    },
    onGetActivitiesDataError: data => {
      dispatch(Actions.getActivitiesDataError(data));
    }
  };
};

export const mapStateToProps = state => {
  return {
    pageLoading: state.ActivitiesReducer.pageLoading,
    activities: state.ActivitiesReducer.activities,
    currentResultsSet: state.ActivitiesReducer.currentResultsSet,
    currentPage: state.ActivitiesReducer.currentPage,
    resultsPerPage: state.ActivitiesReducer.resultsPerPage,
    activitiesDataError: state.ActivitiesReducer.activitiesDataError
  };
};

Activities.propTypes = {
  pageLoading: PropTypes.bool.isRequired,
  activities: PropTypes.array.isRequired,
  currentResultsSet: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  activitiesDataError: PropTypes.bool,
  onSetPageLoading: PropTypes.func.isRequired,
  onGetActivityData: PropTypes.func.isRequired,
  onSetCurrentResultSet: PropTypes.func.isRequired,
  onSetCurrentPage: PropTypes.func.isRequired,
  onResetPage: PropTypes.func.isRequired,
  onGetActivitiesDataError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);    // pass Activities into returned function result of first two functions