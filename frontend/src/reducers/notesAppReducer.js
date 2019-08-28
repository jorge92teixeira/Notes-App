import { combineReducers } from 'redux';
import notes from './notes';
import visibilityFilter from './visibilityFilter';

const notesAppReducer = combineReducers({
  notes,
  visibilityFilter,
});

export default notesAppReducer;
