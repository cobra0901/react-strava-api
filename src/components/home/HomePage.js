import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
        <div>
          <h1></h1>
          <div className="jumbotron">
            <div style={{paddingLeft: "10px"}}>
              <p>React and Strava API playground</p>
              <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
          </div>
        </div>
    );
  }
}

export default HomePage;