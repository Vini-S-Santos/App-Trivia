import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route path="/teste"> teste 2 </Route>
    </>
  );
}
