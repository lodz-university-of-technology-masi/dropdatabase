import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './main/App';
import Amplify from "aws-amplify";
import config from "./config.js";

// TODO ADD CONFIG
Amplify.configure({
  Auth: {
    identityPoolId: config.cognito.IdentityPoolId,
    userPoolId: config.cognito.userPoolId,
    region: config.cognito.region,
    userPoolWebClientId: config.cognito.clientId,
  }
});

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();
