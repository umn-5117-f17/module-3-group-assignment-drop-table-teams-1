import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

//import "../sass/utilities/initial-variables"
//import "../sass/utilities/functions"


import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
