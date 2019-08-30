import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleNote } from '../actions';
import NoteList from './NoteList';

const getVisibleNotes = (notes, filter) => {
  switch (filter) {
    case 'all':
      return notes;
    case 'completed':
      return notes.filter((n) => n.completed);
    case 'active':
      return notes.filter((n) => !n.completed);
    default:
      throw new Error(`Unknow filter: ${filter}`);
  }
};

const mapStateToProps = (state, { match }) => (
  {
    notes: getVisibleNotes(state.notes, match.params.filter || 'all'),
  });

const mapDispatchToProps = (dispatch) => (
  {
    onNoteClick: (id) => {
      dispatch(toggleNote(id));
    },
  });

const NoteListContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteList));

export default NoteListContainer;
