import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// console.log(remote.app.getPath("appData"));
