import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import toastr from 'toastr';
import * as Actions from './ActivityDetailActions';
import Laps from './Laps';
import ElevationGain from './ElevationGain';

export class ActivityDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const activityId = this.props.params.id;
    this.props.onSetPageLoading(true);
    this.props.onGetLapsByActivityId(activityId);
  }

  getLaps() {
    return this.props.activityLaps && this.props.activityLaps.length > 0 ? this.props.activityLaps : [];
  }

  displayErrorToast() {
    toastr.error('Error retrieving Laps Data: Please try again later');
  }

  render() {
    return (
        <div>
          {this.props.pageLoading ? <div id="activityDetailLoader" className="loader center"></div> :
              <div>
                <div>
                  {this.props.activityLapsError && this.displayErrorToast()}
                </div>
                <div>
                  <Laps laps={this.getLaps()}/>
                </div>
                <div style = {{marginTop: "48px"}}>
                  <ElevationGain laps={this.getLaps()}/>
                </div>
              </div>
          }
        </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onSetPageLoading: data => {
      dispatch(Actions.setPageLoading(data));
    },
    onGetLapsByActivityId: data => {
      dispatch(Actions.getLapsByActivityId(data));
    }
  };
};

export const mapStateToProps = state => {
    return {
    pageLoading: state.ActivityDetailReducer.pageLoading,
    activityLaps: state.ActivityDetailReducer.activityLaps,
    activityLapsError: state.ActivityDetailReducer.activityLapsError
  };
};

ActivityDetail.propTypes = {
  params: PropTypes.object.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  activityLaps: PropTypes.array.isRequired,
  activityLapsError: PropTypes.bool,
  onGetLapsByActivityId: PropTypes.func.isRequired,
  onSetPageLoading: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);