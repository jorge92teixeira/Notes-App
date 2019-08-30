import React from 'react';
import ReactDom from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';

const store = configureStore();

ReactDom.render(
  <Root store={store} />,
  document.getElementById('root'),
);
