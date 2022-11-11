import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

// Internal Paths
import LOGIN_PATH from './pages/login/login.type';

// Internal Components
import Config from './pages/Config';
import Login from './pages/login/login';
import Play from './pages/Play';
import FeedBack from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path={ LOGIN_PATH } component={ Login } />
      <Route path="/play" component={ Play } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ FeedBack } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
