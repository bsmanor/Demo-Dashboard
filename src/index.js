import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

//Initialize Firebase
var config = {
  apiKey: "AIzaSyBoPYGQIT4TcjgfzHCnrPX-vHEh2s_DIzc",
  authDomain: "team-dash-b5ea9.firebaseapp.com",
  databaseURL: "https://team-dash-b5ea9.firebaseio.com",
  projectId: "team-dash-b5ea9",
  storageBucket: "",
  messagingSenderId: "218920561000"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
