import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route,BrowserRouter, Switch } from 'react-router-dom';

import Root from './Root'
import Foo from './Foo'
import Movies from './Movies'


ReactDOM.render(
  <div>
    <App />
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Root}/>
        <Route path='/foo' component={Foo}/>
        <Route path = '/movies/:movieId' component = {Movies} />
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById('root'));
