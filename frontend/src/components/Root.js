import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:filter?" render={(props) => <App {...props} />} />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;
