import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/activities" activeClassName="active">Activities</Link></li>
          <li><Link to="/races" activeClassName="active">Races</Link></li>
          <li><Link to="/about" activeClassName="active">About</Link></li>
        </ul>
      </div>
  );
};

export default Header;