import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import Play from './pages/Play';
import store from './redux/store/store';

export default function App() {
  return (
    <Switch>
      <Provider store={ store }>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
        <Route path="/config" component={ Config } />
      </Provider>
    </Switch>
  );
}
