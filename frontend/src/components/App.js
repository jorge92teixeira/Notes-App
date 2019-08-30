import React from 'react';
import AddNote from './AddNote';
import NoteListContainer from './NoteListContainer';
import Navigation from './Navigation';

const App = () => (
  <div>
    <AddNote />
    <NoteListContainer />
    <Navigation />
  </div>
);

export default App;
