import { connect } from 'react-redux';
import { toggleNote } from '../actions';
import NoteList from './NoteList';

const getVisibleNotes = (notes, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return notes;
    case 'SHOW_COMPLETED':
      return notes.filter((n) => n.completed);
    case 'SHOW_ACTIVE':
      return notes.filter((n) => !n.completed);
    default:
      throw new Error(`Unknow filter: ${filter}`);
  }
};

const mapStateToProps = (state) => (
  {
    notes: getVisibleNotes(state.notes, state.visibilityFilter),
  });

const mapDispatchToProps = (dispatch) => (
  {
    onNoteClick: (id) => {
      dispatch(toggleNote(id));
    },
  });

const NoteListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteList);

export default NoteListContainer;
