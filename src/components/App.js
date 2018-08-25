import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';

class App extends React.Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header" style={{paddingLeft: "135px"}}>
                <div className="navbar-brand">
                  Strava Palava
                </div>
              </div>
              <Header/>
            </div>
          </nav>
          <div style={{paddingTop: "100px"}}>
            {this.props.children}
          </div>
        </div>
      );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;