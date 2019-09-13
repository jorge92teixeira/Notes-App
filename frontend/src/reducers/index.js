import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import notesReducer from './notesReducer';

export default combineReducers({
  notes: notesReducer,
  form: formReducer,
});
