import React from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './components/LogOut'

import Dashboard from './views/Dashboard';
import Setup from './views/Setup';


function App() {
  return (
    <div className="App">
        <LogOut />

        <Switch>
            <Route exact path='/signup' component={ SignUp }/>
            <Route exact path='/profile/setup' component={ Setup }/>
            <Route exact path='/login' component={ Login }/>

            <Route exact path='/dashboard' component={ Dashboard }/>

        </Switch>
    </div>
  );
}

export default App;
