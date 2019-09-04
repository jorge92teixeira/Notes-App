import React from 'react';
import { connect } from 'react-redux';
import { fetchNotes } from '../actions';

class NoteList extends React.Component {

  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    console.log('notes', this.props.notes);
    return(
      <div>
        Note List
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  }
};

export default connect(
  mapStateToProps,
  { fetchNotes },
)(NoteList);
