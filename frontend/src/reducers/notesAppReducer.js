import { combineReducers } from 'redux';
import notes, * as fromNotes from './notes';

const notesAppReducer = combineReducers({
  notes,
});

export default notesAppReducer;

export const getVisibleNotes = (state, filter) => fromNotes.getVisibleNotes(state.notes, filter);
