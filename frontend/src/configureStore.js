import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import notesAppReducer from './reducers/notesAppReducer';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = loadState();

  const store = createStore(notesAppReducer, persistedState);
  console.log(store.getState());
  store.subscribe(throttle(() => {
    saveState({
      notes: store.getState().notes,
    });
    console.log(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
