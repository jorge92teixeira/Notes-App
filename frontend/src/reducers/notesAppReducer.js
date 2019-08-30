import { combineReducers } from 'redux';
import notes from './notes';

const notesAppReducer = combineReducers({
  notes,
});

export default notesAppReducer;
