import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { remote } from 'electron';

import { configureAppStore } from './configureStore';
import App from './App';

import './index.css';

const store = configureAppStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// console.log(remote.app.getPath("appData"));
