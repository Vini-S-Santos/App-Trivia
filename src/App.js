import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import Play from './pages/Play';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/play" component={ Play } />
      <Route path="/config" component={ Config } />
    </Switch>
  );
}
