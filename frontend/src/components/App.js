import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Homepage from './Homepage';
import Header from './Header';
import NoteList from './NoteList';
import LoginPage from './LoginPage';

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" exact component={Homepage} />
        <Route path="/notes/list" exact component={NoteList} />
        <Route path="/login" exact component={LoginPage} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
