import React from 'react';
import { connect } from 'react-redux';
import { fetchNotes } from '../actions';

class NoteList extends React.Component {

  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    return(
      <div>
        Note List
      </div>
    )
  }
};

export default connect(
  null,
  { fetchNotes },
)(NoteList);
