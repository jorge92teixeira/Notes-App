/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Note = ({
  onClick,
  completed,
  title,
  content,
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : NamedNodeMap,
    }}
  >
    {title}
    {content}
  </li>
);

Note.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Note;
