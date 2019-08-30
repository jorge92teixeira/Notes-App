/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

const NoteList = ({ notes, onNoteClick }) => (
  <ul>
    {notes
      .map((note) => <Note key={note.id} {...note} onClick={() => onNoteClick(note.id)} />)}
  </ul>
);

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onNoteClick: PropTypes.func.isRequired,
};

export default NoteList;
