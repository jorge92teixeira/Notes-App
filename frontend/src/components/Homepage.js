import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h3>Homepage</h3>
      <Link to="/notes/list">
        Notes List
      </Link>
    </div>
  );
};

export default Homepage;
