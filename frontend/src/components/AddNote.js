import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNote } from '../actions';

const AddNote = ({ dispatch }) => {
  let inputTitle;
  let inputContent;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputContent.value.trim()) {
            return;
          }
          dispatch(addNote(inputTitle.value, inputContent.value));
          inputContent.value = '';
        }}
      >
        Title:
        <input ref={(node) => { inputTitle = node; }} />
        Content:
        <input ref={(node) => { inputContent = node; }} />
        <button type="submit">
          Add Note
        </button>
      </form>
    </div>
  );
};

AddNote.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddNote);
