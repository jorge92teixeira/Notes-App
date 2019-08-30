import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LabelContainer = ({ filter, children }) => (
  <NavLink
    to={filter === 'all' ? '' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </NavLink>
);

LabelContainer.propTypes = {
  filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
  children: PropTypes.node.isRequired,
};

export default LabelContainer;
