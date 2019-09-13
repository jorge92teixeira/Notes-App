import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth';

const divStyle = {
  border: '1px black solid',
};

const Header = () => {
  return (
    <div style={divStyle}>
      <Link to="/">
        Notes-App
      </Link>
      <Auth />
    </div>
  );
};

export default Header;
