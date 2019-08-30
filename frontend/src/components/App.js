import React from 'react';
import PropTypes from 'prop-types';
import AddNote from './AddNote';
import NoteListContainer from './NoteListContainer';
import Navigation from './Navigation';

const App = ({match}) => (
  <div>
    <AddNote />
    <NoteListContainer
      // filter={match.params.filter || 'all'} 
    />
    <Navigation />
  </div>
);

// App.propTypes = {
//   match: PropTypes.object,
// };

export default App;
