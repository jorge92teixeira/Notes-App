import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleNote } from '../actions';
import { getVisibleNotes } from '../reducers/notesAppReducer';
import NoteList from './NoteList';

const mapStateToProps = (state, { match }) => (
  {
    notes: getVisibleNotes(state, match.params.filter || 'all'),
  });

// const mapDispatchToProps = (dispatch) => (
//   {
//     onNoteClick: (id) => {
//       dispatch(toggleNote(id));
//     },
//   });

const NoteListContainer = withRouter(connect(
  mapStateToProps,
  { onNoteClick: toggleNote },
)(NoteList));

export default NoteListContainer;
